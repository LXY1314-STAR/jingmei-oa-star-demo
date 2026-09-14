/* Party-office detail dual mode: the same business page supports read-only view and actionable handling. */
(() => {
  if (typeof AdminWorkspace === 'undefined' || typeof AdminBusiness === 'undefined') return;

  const ui = AdminWorkspace.ui;
  ui.mode = ui.mode || null;

  const originalOpen = AdminWorkspace.open;
  AdminWorkspace.open = function openWithMode(id, mode = 'view') {
    ui.mode = mode === 'handle' ? 'handle' : 'view';
    return originalOpen(id);
  };

  const originalList = AdminWorkspace.list;
  AdminWorkspace.list = function listWithModeReset(key) {
    ui.mode = null;
    return originalList(key);
  };

  const originalBack = AdminWorkspace.back;
  AdminWorkspace.back = function backWithModeReset() {
    const result = originalBack();
    if (!ui.id) ui.mode = null;
    return result;
  };

  const originalNewRecord = AdminWorkspace.newRecord;
  AdminWorkspace.newRecord = function newRecordInHandleMode() {
    ui.mode = 'handle';
    return originalNewRecord();
  };

  const originalCanEdit = AdminBusiness.canEdit;
  AdminBusiness.canEdit = function canEditByOpenMode(record) {
    if (ui.id && record && ui.id === record.id && ui.mode === 'view') return false;
    return originalCanEdit(record);
  };

  const originalCanAct = AdminBusiness.canAct;
  AdminBusiness.canAct = function canActByOpenMode(record) {
    if (ui.id && record && ui.id === record.id && ui.mode === 'view') return false;
    return originalCanAct(record);
  };

  const originalView = AdminWorkspace.view;
  AdminWorkspace.view = function viewWithExplicitOperationMode() {
    let html = originalView();

    if (!ui.id) {
      // Only the operation-column button becomes actionable. Clicking the business title remains a read-only view.
      html = html.replace(
        /onclick="AdminWorkspace\.open\('([^']+)'\)">办理<\/button>/g,
        'onclick="AdminWorkspace.open(\'$1\',\'handle\')">查看及办理</button>'
      );
      html = html.replace(
        /onclick="AdminWorkspace\.open\('([^']+)'\)">查看<\/button>/g,
        'onclick="AdminWorkspace.open(\'$1\',\'view\')">查看</button>'
      );
      return html;
    }

    const modeTip = ui.mode === 'handle'
      ? '<div class="adm-hint"><b>查看及办理</b> · 当前身份为本节点办理人，可查看业务表单并按节点权限维护、保存和提交；流程历史仍保留版本。</div>'
      : '<div class="adm-hint"><b>查看模式</b> · 页面内容、流程、附件和历史保持一致，仅供查看；不可新增、编辑、上传、删除或提交节点动作。</div>';

    return html.replace('<section class="card adm-card">', '<section class="card adm-card">' + modeTip);
  };

  if (typeof DEMO_RELEASE !== 'undefined') {
    DEMO_RELEASE.version = 'V1.7.1-ADMIN-MODE-B1-dev';
    DEMO_RELEASE.scope = '党政事项支持查看/查看及办理双模式；办理人可按节点处理，其他可见人员保持同页只读。';
  }
})();
