/* Employee 360 deepening: self-service archive change, business-result aggregation,
 * archive versions and end-to-end source traceability. All data remains demo/session only.
 */
(() => {
  if (
    typeof HrWorkspace === 'undefined' ||
    typeof db === 'undefined' ||
    typeof employeePage !== 'function' ||
    typeof employeeDetailPage !== 'function'
  ) return;

  const requirement = '员工可按授权填报或提交档案修改申请，人事审核后更新档案；调动、奖惩、绩效及岗位资格等结果按规则归集，保留来源流程、版本和修改轨迹。';
  const oldListDescription = '个人主数据、入职、合同、假勤、培训资格与来源轨迹按员工编号汇总。';
  const esc = value => String(value ?? '—').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
  const makeBadge = value => typeof badge === 'function' ? badge(value) : `<span>${esc(value)}</span>`;
  const infoCell = (label, value) => `<div><small>${esc(label)}</small><b>${value ?? '—'}</b></div>`;
  const recordDef = record => HrWorkspace.def(record.key);
  const employeeById = id => db.employees.find(item => item.id === id);
  const sourceRecord = source => HrWorkspace.get(source);
  const isVisibleSource = source => {
    const record = sourceRecord(source);
    return !!record && HrWorkspace.visible(record);
  };
  const sourceButton = source => isVisibleSource(source)
    ? `<button class="table-link" onclick="HrWorkspace.open('${source}')">${esc(source)}</button>`
    : esc(source);

  function allArchivesFor(employeeId) {
    return HrWorkspace.store.archives.filter(item => item.employeeId === employeeId);
  }

  function archivesFor(employeeId) {
    return allArchivesFor(employeeId).filter(item => {
      const record = sourceRecord(item.source);
      return !record || HrWorkspace.visible(record);
    });
  }

  function versionRows(employeeId) {
    const ordered = [...allArchivesFor(employeeId)].reverse();
    const versioned = ordered.map((item, index) => ({ ...item, archiveVersion: `V${index + 2}` })).reverse();
    return versioned.filter(item => {
      const record = sourceRecord(item.source);
      return !record || HrWorkspace.visible(record);
    });
  }

  function archiveVersion(employeeId) {
    return `V${allArchivesFor(employeeId).length + 1}`;
  }

  function resultRecords(employeeId, keys = ['05', '11', '22', '23', '30', '31']) {
    return HrWorkspace.store.records.filter(record =>
      record.employeeId === employeeId &&
      keys.includes(record.key) &&
      HrWorkspace.visible(record)
    );
  }

  function resultSummary(record) {
    const f = record.f || {};
    switch (record.key) {
      case '05': return `${f.异动类型 || '岗位异动'} · ${f.目标部门 || '—'} / ${f.目标岗位 || '—'}`;
      case '11': return `${f.变更字段 || '档案字段'}：${f.变更后值 || '—'}`;
      case '22': return `${f.周期 || '绩效周期'} · ${f.结果等级 || '待确认'} · ${f.校准分 || f.原评分 || '—'}分`;
      case '23': return `${f.奖惩类型 || '奖惩'} · ${f.依据 || '—'}`;
      case '30': return `${f.证照名称 || '证照'} · ${f.办理类型 || '维护'}`;
      case '31': return `${f.资格名称 || f.目标岗位 || '岗位资格'} · 到期 ${f.到期日期 || '—'}`;
      default: return recordDef(record)?.short || record.id;
    }
  }

  function resultEffectiveDate(record) {
    const f = record.f || {};
    return f.生效日期 || f.到期日期 || f.周期 || f.月份 || '—';
  }

  function archiveKind(record) {
    if (!record) return '业务结果';
    return ({
      '05': '岗位异动',
      '11': '档案变更',
      '22': '绩效结果',
      '23': '奖惩结果',
      '30': '证照结果',
      '31': '岗位资格'
    })[record.key] || recordDef(record)?.short || '业务结果';
  }

  function archiveDetail(item) {
    if (!item?.detail) return '—';
    if (typeof HrBusiness !== 'undefined' && typeof HrBusiness.format === 'function') {
      return HrBusiness.format(item.detail);
    }
    if (typeof item.detail === 'string') return item.detail;
    return Object.entries(item.detail).map(([key, value]) => `${key}：${typeof value === 'object' ? JSON.stringify(value) : value}`).join('；');
  }

  function recordTable(records, emptyText = '暂无关联流程。') {
    if (!records.length) return `<div class="empty compact">${esc(emptyText)}</div>`;
    return `<div class="table-card hw-table"><table><thead><tr>
      <th>业务类型</th><th>结果 / 内容</th><th>生效 / 周期</th><th>来源流程</th><th>流程版本</th><th>状态</th><th>操作</th>
      </tr></thead><tbody>${records.map(record => `<tr>
        <td>${esc(archiveKind(record))}</td>
        <td>${esc(resultSummary(record))}</td>
        <td>${esc(resultEffectiveDate(record))}</td>
        <td>${esc(recordDef(record)?.name || record.id)}<small>${esc(record.id)}</small></td>
        <td>V${esc(record.version)}</td>
        <td>${makeBadge(HrWorkspace.status(record))}</td>
        <td><button class="table-link" onclick="HrWorkspace.open('${record.id}')">查看来源</button></td>
      </tr>`).join('')}</tbody></table></div>`;
  }

  function archivedResultTable(employeeId) {
    const rows = versionRows(employeeId);
    if (!rows.length) {
      return '<div class="empty compact">暂无已归集结果。相关业务流程办结后，将自动写入员工档案并形成版本轨迹。</div>';
    }
    return `<div class="table-card hw-table"><table><thead><tr>
      <th>档案版本</th><th>业务类型</th><th>归集结果</th><th>来源单据</th><th>来源版本</th><th>归集日期</th><th>操作</th>
      </tr></thead><tbody>${rows.map(item => {
        const record = sourceRecord(item.source);
        return `<tr>
          <td><b>${esc(item.archiveVersion)}</b></td>
          <td>${esc(item.kind || archiveKind(record))}</td>
          <td>${esc(archiveDetail(item))}</td>
          <td>${sourceButton(item.source)}</td>
          <td>V${esc(item.version)}</td>
          <td>${esc(item.time)}</td>
          <td>${isVisibleSource(item.source) ? `<button class="table-link" onclick="HrWorkspace.open('${item.source}')">查看来源流程</button>` : '—'}</td>
        </tr>`;
      }).join('')}</tbody></table></div>`;
  }

  function changeTrail(employee) {
    const logs = employee.audit || [];
    if (!logs.length) return '<div class="empty compact">暂无变更记录。</div>';
    return `<div class="audit-list">${logs.map(item => `<div class="audit-row">
      <time>${esc(item.time)}</time>
      <div><b>${esc(item.actor)} · ${esc(item.action)}</b><small>${esc(item.result)}</small></div>
    </div>`).join('')}</div>`;
  }

  function maintenanceRulePanel(employeeId) {
    const canRequest = state.role === 'hr' || HrWorkspace.employeeForRole() === employeeId;
    const action = canRequest
      ? `<button class="secondary" onclick="openEmployeeArchiveChange('${employeeId}')">${state.role === 'hr' ? '发起档案变更' : '提交档案修改申请'}</button>`
      : '';
    return `<section class="card hw-panel"><div class="card-h"><h2>档案维护与归集规则</h2><div class="hw-tools">${action}</div></div>
      <div class="profile-metrics">
        <button ${canRequest ? `onclick="openEmployeeArchiveChange('${employeeId}','location')"` : 'disabled'}><b>本人资料</b><span>授权字段可填报 / 申请修改</span></button>
        <button disabled><b>人事维护</b><span>人事主数据字段范围待确认</span></button>
        <button onclick="setEmployeeTab('employment')"><b>任职结果</b><span>调动、岗位结果由来源流程归集</span></button>
        <button onclick="setEmployeeTab('performance')"><b>结果类档案</b><span>绩效、奖惩、资格只读追溯</span></button>
      </div>
      <div class="hw-boundary">档案中的流程结果不直接手工改写；需要调整时应回到来源业务流程办理，重新归集并生成新的档案版本。本人可维护字段、人事直接维护字段及审批矩阵以客户最终制度为准。</div>
    </section>`;
  }

  globalThis.openEmployeeArchiveChange = function openEmployeeArchiveChange(employeeId, field = 'location') {
    const target = employeeById(employeeId);
    if (!target) return toast('员工不存在');

    const ownEmployeeId = HrWorkspace.employeeForRole();
    const canRequest = state.role === 'hr' || ownEmployeeId === employeeId;
    if (!canRequest) return toast('当前身份不能为该员工发起档案变更');

    const editableField = ['mobile', 'location'].includes(field) ? field : 'location';
    HrWorkspace.create('11');
    const draft = HrWorkspace.ui.edit;
    if (!draft || draft.key !== '11') return;

    draft.employeeId = employeeId;
    draft.f.变更字段 = editableField;
    draft.f.变更后值 = target[editableField] || '';
    draft.f.变更原因 = state.role === 'hr' ? '人事维护员工档案资料' : '员工申请更新档案资料';
    render();
  };

  const previousEmployeePage = employeePage;
  employeePage = function employee360Page() {
    return previousEmployeePage().replace(oldListDescription, requirement);
  };

  const previousEmployeeArchive = HrWorkspace.employeeArchive;
  HrWorkspace.employeeArchive = function employeeArchiveWithResultTitle(id) {
    return previousEmployeeArchive(id).replace('人事结果与版本', '归集结果与版本轨迹');
  };

  employeeDetailPage = function employee360DetailPage() {
    const e = employeeById(state.employeeId);
    if (!e) return shell('<div class="empty">员工不存在</div>', '员工360档案详情', requirement);

    const leaves = db.leaves.filter(item => item.employeeId === e.id);
    const onb = db.onboardings.find(item => item.employeeId === e.id);
    const allArchives = archivesFor(e.id);
    const allArchiveCount = allArchivesFor(e.id).length;
    const relatedResults = resultRecords(e.id);
    const performanceRecords = resultRecords(e.id, ['22', '23']);
    const employmentRecords = resultRecords(e.id, ['05', '11']);
    const qualificationRecords = resultRecords(e.id, ['30', '31']);
    const currentVersion = archiveVersion(e.id);
    const ownEmployeeId = HrWorkspace.employeeForRole();
    const canRequest = state.role === 'hr' || ownEmployeeId === e.id;
    const progress = onb && typeof onboardingProgress === 'function' ? onboardingProgress(onb) : '—';
    const tabs = [
      ['overview', '档案总览'],
      ['employment', '任职与合同'],
      ['performance', '绩效与奖惩'],
      ['attendance', '假勤记录'],
      ['qualification', '培训与资格'],
      ['source', '来源与版本']
    ];

    let body = '';
    if (state.employeeTab === 'overview') {
      body = `<div class="split">
        <section class="card"><div class="card-h"><h2>基本信息</h2><div class="hw-tools"><span class="meta">敏感字段已脱敏</span>${canRequest ? `<button class="secondary" onclick="openEmployeeArchiveChange('${e.id}')">${state.role === 'hr' ? '发起档案变更' : '提交档案修改申请'}</button>` : ''}</div></div>
          <div class="info-grid">${infoCell('员工编号', esc(e.id))}${infoCell('姓名', esc(e.name))}${infoCell('性别', esc(e.gender))}${infoCell('手机', esc(e.mobile))}${infoCell('所属组织', esc(e.org))}${infoCell('岗位', esc(e.position))}${infoCell('职级', esc(e.level))}${infoCell('直属上级', esc(e.manager))}${infoCell('工作地点', esc(e.location))}${infoCell('当前档案版本', `<button class="table-link" onclick="setEmployeeTab('source')">${esc(currentVersion)}</button>`)}</div>
        </section>
        <section class="card"><div class="card-h"><h2>在职服务与档案概览</h2><span class="meta">结果按员工编号统一归集</span></div>
          <div class="profile-metrics">
            <button onclick="setEmployeeTab('attendance')"><b>${esc(e.annualBalance)}天</b><span>年休假可用余额</span></button>
            <button onclick="setEmployeeTab('qualification')"><b>${e.qualifications.length}</b><span>岗位资格</span></button>
            <button onclick="setEmployeeTab('performance')"><b>${performanceRecords.length}</b><span>绩效 / 奖惩来源</span></button>
            <button onclick="setEmployeeTab('source')"><b>${allArchiveCount}</b><span>已归集业务结果</span></button>
            <button onclick="${onb ? `showOnboarding('${onb.id}')` : 'void(0)'}"><b>${esc(progress)}%</b><span>入职协同完成度</span></button>
          </div>
        </section>
      </div>${maintenanceRulePanel(e.id)}`;
    }

    if (state.employeeTab === 'employment') {
      body = `<div class="split">
        <section class="card"><div class="card-h"><h2>当前任职信息</h2><span class="meta">当前有效版本 ${esc(currentVersion)}</span></div>
          <div class="info-grid">${infoCell('员工状态', makeBadge(e.status))}${infoCell('入职日期', esc(e.hireDate))}${infoCell('所属组织', esc(e.org))}${infoCell('岗位', esc(e.position))}${infoCell('职级', esc(e.level))}${infoCell('直属上级', esc(e.manager))}</div>
        </section>
        <section class="card"><div class="card-h"><h2>劳动合同</h2></div>
          <div class="info-grid">${infoCell('合同编号', esc(e.contractNo))}${infoCell('合同类型', '固定期限劳动合同')}${infoCell('合同到期日', esc(e.contractEnd))}${infoCell('签署方式', e.contractNo === '待生成' ? '待入职日电子签署' : '电子签署')}${infoCell('合同状态', e.contractNo === '待生成' ? makeBadge('待办理') : makeBadge('已生效'))}${infoCell('归档来源', '电子合同平台')}</div>
        </section>
      </div>
      <section class="card"><div class="card-h"><h2>任职及档案变更来源</h2><span class="meta">组织岗位及主数据变更必须追溯来源流程</span></div>${recordTable(employmentRecords, '暂无岗位异动或档案变更流程。')}</section>`;
    }

    if (state.employeeTab === 'performance') {
      const archivedCount = allArchives.filter(item => ['22', '23'].includes(sourceRecord(item.source)?.key)).length;
      const pendingCount = performanceRecords.filter(record => !HrWorkspace.done(record)).length;
      body = `<div class="stat-row">
        <button class="stat active"><b>${performanceRecords.length}</b><span>绩效 / 奖惩来源</span></button>
        <button class="stat"><b>${archivedCount}</b><span>已归集档案</span></button>
        <button class="stat"><b>${pendingCount}</b><span>待确认 / 办理中</span></button>
        <button class="stat"><b>${esc(currentVersion)}</b><span>当前档案版本</span></button>
      </div>
      <section class="card"><div class="card-h"><h2>绩效与奖惩结果</h2><span class="meta">结果只读展示，修改回到来源流程</span></div>
        ${recordTable(performanceRecords, '暂无绩效或奖惩来源流程。')}
        <div class="hw-boundary">绩效评分、校准、员工确认/申诉及奖惩审批均在对应来源流程完成。员工360仅归集最终有效结果并保留来源单号、来源版本和档案版本，不在档案页面直接修改结果。</div>
      </section>`;
    }

    if (state.employeeTab === 'attendance') {
      body = `<div class="split">
        <section class="card"><div class="card-h"><h2>假期余额</h2><button class="primary" onclick="openLeaveForm('${e.id}')">发起请假</button></div>
          <div class="balance-panel"><strong>${esc(e.annualBalance)}</strong><span>天 · 年休假可用</span><small>审批通过后即时扣减；撤销或驳回自动返还。</small></div>
          <div class="mini-table">${leaves.map(item => `<div class="mini-row"><a onclick="showLeave('${item.id}')">${esc(item.id)}</a><span>${esc(item.type)} ${esc(item.days)}天</span><span>${esc(item.start.slice(0, 10))}</span>${makeBadge(item.status)}</div>`).join('') || '<div class="empty compact">暂无请假记录。</div>'}</div>
        </section>
        <section class="card"><div class="card-h"><h2>最近考勤结果</h2><span class="meta">考勤机 / OA单据融合</span></div>
          <div class="mini-table">${e.attendance.map(item => `<div class="mini-row"><b>${esc(item.date)}</b><span>${esc(item.shift)}</span><span>${esc(item.source)}</span>${makeBadge(item.result)}</div>`).join('') || '<div class="empty compact">入职后生成考勤记录。</div>'}</div>
        </section>
      </div>`;
    }

    if (state.employeeTab === 'qualification') {
      body = `<section class="card"><div class="card-h"><h2>岗位资格与培训结果</h2><button class="link" onclick="go('qualification')">进入资格中心 →</button></div>
        <div class="qualification-list">${e.qualifications.map(item => `<article><div class="qual-icon">证</div><div><span>${esc(item.category)}</span><h3>${esc(item.name)}</h3><p>发证/生效：${esc(item.issued)} · 到期：${esc(item.expires)}</p><small>来源：${esc(item.source)}</small></div>${makeBadge(item.status)}</article>`).join('')}</div>
      </section>
      <section class="card"><div class="card-h"><h2>资格与证照来源流程</h2><span class="meta">培训、考试、证照及岗位资格结果按规则归集</span></div>${recordTable(qualificationRecords, '暂无资格或证照来源流程。')}</section>`;
    }

    if (state.employeeTab === 'source') {
      const latest = allArchives[0]?.time || (e.audit || [])[0]?.time || '—';
      body = `<div class="stat-row">
        <button class="stat active"><b>${esc(currentVersion)}</b><span>当前档案版本</span></button>
        <button class="stat"><b>${allArchiveCount}</b><span>已归集结果</span></button>
        <button class="stat"><b>${relatedResults.length}</b><span>关联来源流程</span></button>
        <button class="stat"><b>${(e.audit || []).length}</b><span>修改 / 同步轨迹</span></button>
      </div>
      <section class="card"><div class="card-h"><h2>归集结果与版本轨迹</h2><span class="meta">档案版本 + 来源流程版本双重留痕</span></div>
        ${archivedResultTable(e.id)}
      </section>
      <section class="card"><div class="card-h"><h2>待归集 / 当前来源流程</h2><span class="meta">流程办结后自动形成下一档案版本</span></div>${recordTable(relatedResults, '暂无关联来源流程。')}</section>
      <div class="split">
        <section class="card"><div class="card-h"><h2>字段来源链路</h2><span class="meta">可追到系统、业务单据与结果版本</span></div>
          <div class="source-chain"><div><b>招聘 / 入职</b><span>姓名、入职部门、岗位、入职日期</span></div><i>→</i><div><b>HR主数据</b><span>员工编号、组织岗位、任职状态</span></div><i>→</i><div><b>业务结果</b><span>调动、绩效、奖惩、资格等流程结果</span></div><i>→</i><div><b>${esc(currentVersion)}</b><span>员工360当前有效档案</span></div></div>
        </section>
        <section class="card"><div class="card-h"><h2>修改与同步轨迹</h2><span class="meta">最近更新：${esc(latest)}</span></div>${changeTrail(e)}</section>
      </div>`;
    }

    const content = `<button class="back-link" onclick="go('employee')">← 返回员工档案</button>
      <div class="employee-hero"><div class="employee-avatar">${esc(e.avatar)}</div><div><span>${esc(e.id)} · ${esc(e.source)}</span><h1>${esc(e.name)}</h1><p>${esc(e.org)} / ${esc(e.position)} / ${esc(e.level)}</p></div><div class="employee-state">${makeBadge(e.status)}<small>档案 ${esc(currentVersion)} · 入职 ${esc(e.hireDate)}</small></div></div>
      <div class="tabs">${tabs.map(([key, label]) => `<button class="${state.employeeTab === key ? 'active' : ''}" onclick="setEmployeeTab('${key}')">${label}</button>`).join('')}</div>${body}`;
    return shell(content, '员工360档案详情', requirement);
  };

  render();
})();
