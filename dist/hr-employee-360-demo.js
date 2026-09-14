/* Employee 360 demo enhancement: expose the existing archive-change workflow from the employee profile and make result/version aggregation explicit. */
(() => {
  if (
    typeof HrWorkspace === 'undefined' ||
    typeof db === 'undefined' ||
    typeof employeePage !== 'function' ||
    typeof employeeDetailPage !== 'function'
  ) return;

  const requirement = '员工可按授权填报或提交档案修改申请，人事审核后更新档案；调动、奖惩、绩效及岗位资格等结果按规则归集，保留来源流程、版本和修改轨迹。';
  const oldListDescription = '个人主数据、入职、合同、假勤、培训资格与来源轨迹按员工编号汇总。';
  const oldDetailDescription = '同一员工编号下完整呈现个人信息、任职关系、业务记录与来源轨迹。';

  globalThis.openEmployeeArchiveChange = function openEmployeeArchiveChange(employeeId) {
    const target = db.employees.find(item => item.id === employeeId);
    if (!target) return toast('员工不存在');

    const ownEmployeeId = HrWorkspace.employeeForRole();
    const canRequest = state.role === 'hr' || ownEmployeeId === employeeId;
    if (!canRequest) return toast('当前身份不能为该员工发起档案变更');

    HrWorkspace.create('11');
    const draft = HrWorkspace.ui.edit;
    if (!draft || draft.key !== '11') return;

    draft.employeeId = employeeId;
    draft.f.变更字段 = 'location';
    draft.f.变更后值 = target.location || '';
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

  const previousEmployeeDetailPage = employeeDetailPage;
  employeeDetailPage = function employee360DetailPage() {
    const target = db.employees.find(item => item.id === state.employeeId);
    let html = previousEmployeeDetailPage().replace(oldDetailDescription, requirement);
    if (!target) return html;

    const ownEmployeeId = HrWorkspace.employeeForRole();
    const canRequest = state.role === 'hr' || ownEmployeeId === target.id;
    if (!canRequest) return html;

    const label = state.role === 'hr' ? '发起档案变更' : '提交档案修改申请';
    const originalHeader = '<h2>基本信息</h2><span class="meta">敏感字段已脱敏</span>';
    const enhancedHeader = `<h2>基本信息</h2><div class="hw-tools"><span class="meta">敏感字段已脱敏</span><button class="secondary" onclick="openEmployeeArchiveChange('${target.id}')">${label}</button></div>`;
    return html.replace(originalHeader, enhancedHeader);
  };

  render();
})();
