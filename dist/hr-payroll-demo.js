/* Payroll demo enhancement: show three default people in the batch draft while preserving one payslip record per employee for downstream confirmation. */
(() => {
  if (typeof HrWorkspace === 'undefined' || typeof HrBusiness === 'undefined' || typeof db === 'undefined') return;

  const PAY_KEY = '24';
  const copy = value => JSON.parse(JSON.stringify(value));
  const defaultItems = [
    { 员工编号: 'EMP-2026-018', 金额: 8000 },
    { 员工编号: 'EMP-2025-089', 金额: 8600 },
    { 员工编号: 'EMP-2024-133', 金额: 7200 },
  ];

  const isBatchRecord = (record, batch) =>
    record &&
    record.key === PAY_KEY &&
    !record.historical &&
    record.caseType !== '异常' &&
    record.f.导入批次 === batch;

  const batchRecords = batch => HrWorkspace.store.records.filter(record => isBatchRecord(record, batch));

  const rebuildBusiness = record => {
    delete record.business;
    HrBusiness.ensure(record);
  };

  function seedDefaultBatch() {
    const master = HrWorkspace.getByKey(PAY_KEY);
    if (!master) return;

    const batch = master.f.导入批次;
    const historical = HrWorkspace.store.records.find(record => record.id === 'HR-HISTORY-24');
    const exception = HrWorkspace.store.records.find(record => record.id === 'HR-EXCEPTION-24');
    if (historical) historical.f.导入批次 = `${batch}-HISTORY`;
    if (exception) exception.f.导入批次 = `${batch}-ERROR`;

    for (const item of defaultItems) {
      let record = batchRecords(batch).find(row => row.employeeId === item.员工编号);
      if (!record) {
        record = HrWorkspace.createRecord(PAY_KEY, item.员工编号);
        record.f = copy(master.f);
        record.company = master.company;
        record.requesterRole = master.requesterRole;
        record.reason = master.reason || '按业务需要提交（演示）';
        HrWorkspace.store.records.push(record);
      }
      record.employeeId = item.员工编号;
      record.items = [copy(item)];
      rebuildBusiness(record);
    }
  }

  seedDefaultBatch();

  const originalCreate = HrWorkspace.create;
  HrWorkspace.create = function createPayrollBatch(key) {
    const result = originalCreate.apply(this, arguments);
    if (key === PAY_KEY && HrWorkspace.ui.edit?.key === PAY_KEY) {
      HrWorkspace.ui.edit.items = copy(defaultItems);
      render();
    }
    return result;
  };

  const originalEdit = HrWorkspace.edit;
  HrWorkspace.edit = function editPayrollBatch() {
    const current = HrWorkspace.get();
    const result = originalEdit.apply(this, arguments);
    const draft = HrWorkspace.ui.edit;
    if (current?.key === PAY_KEY && draft?.key === PAY_KEY) {
      const records = batchRecords(current.f.导入批次);
      if (records.length) {
        draft.items = records.map(record => copy(record.items[0] || { 员工编号: record.employeeId, 金额: 0 }));
        render();
      }
    }
    return result;
  };

  const originalAddItem = HrWorkspace.addItem;
  HrWorkspace.addItem = function addPayrollPerson() {
    const payrollEditing = HrWorkspace.ui.edit?.key === PAY_KEY;
    const result = originalAddItem.apply(this, arguments);
    if (payrollEditing && HrWorkspace.ui.edit?.key === PAY_KEY) {
      const items = HrWorkspace.ui.edit.items;
      const used = new Set(items.slice(0, -1).map(item => item.员工编号));
      const nextEmployee = db.employees.find(employee => !used.has(employee.id));
      if (nextEmployee && items.length) items[items.length - 1].员工编号 = nextEmployee.id;
      render();
    }
    return result;
  };

  const originalSave = HrWorkspace.save;
  HrWorkspace.save = function savePayrollBatch() {
    const draft = HrWorkspace.ui.edit;
    if (draft?.key !== PAY_KEY) return originalSave.apply(this, arguments);

    const form = document.querySelector('#hw-form');
    if (!form?.reportValidity()) return false;

    const values = Object.fromEntries(new FormData(form));
    const items = [...document.querySelectorAll('#hw-edit-items tr')].map(row => {
      const item = {};
      for (const input of row.querySelectorAll('[data-item]')) {
        item[input.dataset.item] = input.dataset.item === '金额' ? Number(input.value) : input.value.trim();
      }
      return item;
    });

    if (!items.length) return HrWorkspace.fail('工资条至少保留一条人员明细');
    if (items.some(item => !db.employees.some(employee => employee.id === item.员工编号) || !Number.isFinite(item.金额) || item.金额 < 0)) {
      return HrWorkspace.fail('工资条人员或金额无效');
    }
    if (new Set(items.map(item => item.员工编号)).size !== items.length) return HrWorkspace.fail('工资条含重复人员');

    const current = HrWorkspace.get(draft.id);
    const oldBatch = current?.f.导入批次 || draft.f.导入批次;
    const existing = batchRecords(oldBatch);
    if (existing.some(record => record.stage >= 0)) return HrWorkspace.fail('当前批次已有提交记录，不能在批次草稿中直接增删人员');

    const fields = copy(draft.f);
    for (const field of HrWorkspace.def(PAY_KEY).fields) fields[field.key] = values[field.key];
    const reason = values.修改原因 || '按业务需要提交（演示）';
    const previousByEmployee = new Map(existing.map(record => [record.employeeId, record]));
    const candidates = [];

    for (const item of items) {
      const previous = previousByEmployee.get(item.员工编号);
      let record;
      if (previous) {
        record = copy(previous);
        record.files = [...previous.files];
        record.history = [...(previous.history || []), {
          version: previous.version,
          f: copy(previous.f),
          items: copy(previous.items),
          business: copy(previous.business || {}),
          reason,
        }];
        record.version = previous.version + 1;
      } else {
        record = HrWorkspace.createRecord(PAY_KEY, item.员工编号);
      }

      record.employeeId = item.员工编号;
      record.company = draft.company || record.company;
      record.requesterRole = draft.requesterRole || record.requesterRole;
      record.f = copy(fields);
      record.items = [copy(item)];
      record.reason = reason;
      record.stage = -1;
      record.checks = {};
      rebuildBusiness(record);

      const error = HrWorkspace.validate(record, false);
      if (error) return HrWorkspace.fail(error);
      candidates.push({ record, previous });
    }

    const oldIds = new Set(existing.map(record => record.id));
    HrWorkspace.store.records = HrWorkspace.store.records.filter(record => !oldIds.has(record.id));
    HrWorkspace.store.records.unshift(...candidates.map(item => item.record));

    for (const { record, previous } of candidates) {
      HrWorkspace.log(record, previous ? '保存修订' : '新建申请', reason, previous?.f, record.f);
    }

    HrWorkspace.ui.edit = null;
    HrWorkspace.todoSync();
    HrWorkspace.open(candidates[0].record.id);
    return true;
  };
})();
