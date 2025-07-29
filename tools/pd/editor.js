// 编辑器功能脚本
class DocumentEditor {
  constructor() {
    this.currentTab = "1"
    this.isPreviewMode = false
    this.documentData = this.loadData()
    this.sections = {
      1: {
        title: "需求分析",
        icon: "fas fa-users",
        color: "#3b82f6",
        fields: [
          {
            id: "user_segmentation",
            label: "用户划分",
            placeholder: "填写目标用户群体的分类标准（如按行业、年龄、行为等）",
          },
          {
            id: "user_pain_points",
            label: "用户痛点",
            placeholder: "列举用户在当前场景中的核心问题（如效率低、成本高、体验差等）",
          },
          {
            id: "core_scenarios",
            label: "核心需求场景",
            placeholder: '描述用户使用产品的典型场景（如"用户在XX场景下需要XX功能"）',
          },
          { id: "user_persona", label: "用户画像", placeholder: "构建目标用户的年龄、职业、行为习惯等详细画像" },
          { id: "user_journey", label: "用户旅程图", placeholder: "绘制用户使用产品过程中的关键触点、痛点和机会点" },
          { id: "requirement_priority", label: "需求优先级", placeholder: "通过KANO模型、MoSCoW法则等工具对需求排序" },
          { id: "market_size", label: "市场空间", placeholder: "分析目标市场的规模、增长潜力及用户基数" },
          { id: "partner_willingness", label: "合作机构意愿", placeholder: "评估潜在合作伙伴（如渠道、技术供应商）的合作可能性" },
          { id: "tech_maturity", label: "技术成熟度", placeholder: "判断当前技术能否支持产品需求（如AI、云计算等）" },
          { id: "mrd", label: "市场需求文档（MRD）", placeholder: "明确市场需求、目标用户、市场规模及产品定位" },
          { id: "tech_feasibility", label: "技术可行性评估", placeholder: "结合技术团队能力，评估需求的技术实现难度和成本" },
          { id: "competitor_list", label: "竞品列表", placeholder: "列出核心竞品名称及定位" },
          { id: "differentiation_ability", label: "差异化服务能力", placeholder: "分析竞品在功能、用户体验、定价等方面的差异" },
          { id: "competitor_comparison", label: "竞品功能对比表", placeholder: "对比分析各竞品的核心功能和优劣势" },
          { id: "differentiation_strategy", label: "差异化策略", placeholder: "基于竞品分析提出产品的差异化能力（如功能创新、用户体验优化等）" },
        ],
      },
      2: {
        title: "商业化分析",
        icon: "fas fa-chart-bar",
        color: "#10b981",
        fields: [
          {
            id: "product_positioning",
            label: "产品定位",
            placeholder: '明确产品在市场中的定位（如"解决XX问题的工具型产品"）',
          },
          { id: "revenue_model", label: "盈利模式", placeholder: "选择收入来源（订阅制、广告、交易分成等）" },
          {
            id: "cost_structure",
            label: "成本结构",
            placeholder: "估算产品开发、运营和维护的成本（如人力、服务器、市场费用）",
          },
          { id: "financial_model", label: "财务模型", placeholder: "预测产品各阶段的收入、成本和利润（如LTV/CAC模型）" },
          { id: "pricing_strategy", label: "定价策略", placeholder: "设计产品定价（如基础版¥0/高级版¥XX/企业版¥XX）" },
          {
            id: "channel_strategy",
            label: "渠道策略",
            placeholder: "规划产品推广和销售的渠道（线上/线下、自有渠道/合作渠道）",
          },
          { id: "partner_plan", label: "合作伙伴计划", placeholder: "设计与第三方合作的模式（如API开放、联合运营等）" },
          { id: "stage_strategy", label: "阶段化策略", placeholder: "制定产品不同阶段的商业化目标（如冷启动期、增长期、成熟期）" },
        ],
      },
      3: {
        title: "产品设计",
        icon: "fas fa-lightbulb",
        color: "#8b5cf6",
        fields: [
          {
            id: "feature_flowchart",
            label: "功能流程图",
            placeholder: "绘制核心功能的业务流程图（可用Visio、ProcessOn等工具）",
          },
          { id: "prototype", label: "简单原型", placeholder: "输出低保真原型（Axure、Figma等工具）" },
          { id: "prd", label: "产品需求文档（PRD）", placeholder: "详细描述功能需求、用户角色、业务流程、交互设计等" },
          {
            id: "user_stories",
            label: "用户故事（User Story）",
            placeholder: '以用户视角描述功能需求（如"作为用户，我希望..."）',
          },
          {
            id: "product_roadmap",
            label: "产品路线图",
            placeholder: "明确产品各阶段的目标、功能规划和时间节点（甘特图形式）",
          },
          { id: "tech_solution", label: "技术方案设计", placeholder: "与技术团队协作，设计系统架构、接口规范等" },
          { id: "high_fidelity_prototype", label: "原型设计", placeholder: "输出高保真原型（Axure、Figma等工具），用于用户测试和团队对齐" },
        ],
      },
      4: {
        title: "运营方案",
        icon: "fas fa-rocket",
        color: "#f59e0b",
        fields: [
          { id: "cold_start", label: "冷启动计划", placeholder: "设计种子用户获取策略（如内测、邀请制、KOL合作）" },
          {
            id: "marketing_strategy",
            label: "传播策略",
            placeholder: "规划内容营销、社交媒体运营、活动策划等传播方式",
          },
          { id: "channel_cooperation", label: "渠道合作计划", placeholder: "与外部渠道（如应用商店、电商平台）的资源整合方案" },
          { id: "user_education", label: "用户教育材料", placeholder: "制作产品使用指南、FAQ、视频教程等" },
          { id: "sales_support", label: "销售支持文档", placeholder: "为销售团队提供产品介绍手册、销售话术、案例库等" },
          {
            id: "data_monitoring",
            label: "数据监控方案",
            placeholder: "设计关键指标（如DAU、转化率）的监控体系和看板",
          },
        ],
      },
      5: {
        title: "项目管理与执行",
        icon: "fas fa-cogs",
        color: "#ef4444",
        fields: [
          { id: "development_plan", label: "开发计划", placeholder: "制定详细的研发计划（甘特图、里程碑节点）" },
          {
            id: "resource_coordination",
            label: "资源协调文档",
            placeholder: "明确各团队（研发、设计、测试）的职责分工和协作流程",
          },
          {
            id: "risk_management",
            label: "风险预案",
            placeholder: "识别潜在风险（如技术瓶颈、市场变化）并制定应对方案",
          },
          { id: "testing_plan", label: "测试计划", placeholder: "包括功能测试、性能测试、兼容性测试等方案" },
          {
            id: "launch_checklist",
            label: "上线检查清单",
            placeholder: "确保产品符合上线标准（如代码质量、安全合规）",
          },
          { id: "release_plan", label: "发布计划", placeholder: "明确发布时间、发布版本、发布渠道及宣传节奏" },
          { id: "data_analysis", label: "数据分析报告", placeholder: "定期输出产品核心指标分析（如用户留存、功能使用率）" },
          { id: "user_feedback", label: "用户反馈报告", placeholder: "收集并整理用户反馈，形成改进建议" },
          { id: "iteration_plan", label: "迭代计划", placeholder: "根据数据反馈制定产品优化和新功能开发计划" },
          { id: "product_knowledge", label: "产品知识库", placeholder: "整理产品设计、开发、运营等过程中的经验教训" },
          { id: "team_training", label: "团队培训材料", placeholder: "为团队提供产品背景、功能说明和运营策略的培训资料" },
          { id: "additional_notes", label: "其他补充说明", placeholder: "可根据实际需求添加未涵盖的内容" },
        ],
      },
      6: {
        title: "附录",
        icon: "fas fa-book-open",
        color: "#6b7280",
        fields: [
          { id: "glossary", label: "术语表", placeholder: "定义文档中涉及的专业术语或缩写" },
          { id: "references", label: "参考资料", placeholder: "引用市场调研报告、竞品分析资料、技术文档等" },
        ],
      },
    }

    this.init()
  }

  init() {
    this.bindEvents()
    this.renderContent()
    this.updateProgress()
  }

  bindEvents() {
    // 标签页切换
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.switchTab(e.target.closest(".tab-button").dataset.tab)
      })
    })

    // 预览模式切换
    document.getElementById("preview-btn").addEventListener("click", () => {
      this.togglePreviewMode()
    })

    // 保存
    document.getElementById("save-btn").addEventListener("click", () => {
      this.saveData()
    })

    // 导出
    document.getElementById("export-btn").addEventListener("click", () => {
      this.exportData()
    })
  }

  switchTab(tabId) {
    this.currentTab = tabId

    // 更新标签页样式
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.remove("active")
    })
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active")

    // 更新标题和图标
    const section = this.sections[tabId]
    document.getElementById("section-title").innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="background: ${section.color}; color: white; padding: 0.5rem; border-radius: 0.5rem;">
                    <i class="${section.icon}"></i>
                </div>
                <span>${tabId}. ${section.title}</span>
            </div>
        `

    this.renderContent()
  }

  renderContent() {
    const section = this.sections[this.currentTab]
    const container = document.getElementById("editor-content")

    if (this.isPreviewMode) {
      // 预览模式显示所有模块
      this.renderAllModulesPreview(container)
      // 隐藏侧边栏标签页功能，因为预览模式显示所有内容
      document.querySelector(".card").parentElement.style.display = "block"
    } else {
      this.renderEditor(container, section)
      document.querySelector(".card").parentElement.style.display = "block"
    }
  }

  renderEditor(container, section) {
    container.innerHTML = section.fields
      .map(
        (field) => `
            <div class="form-group" style="margin-bottom: 2rem;">
                <label class="form-label" style="font-weight: 600; margin-bottom: 0.5rem; color: #374151;">${field.label}</label>
                <div class="editor-container" style="border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
                    <div id="editor-${field.id}" style="min-height: 200px;"></div>
                </div>
                <div class="editor-toolbar" style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                    <span>${field.placeholder}</span>
                </div>
            </div>
        `,
      )
      .join("")

    // 初始化富文本编辑器
    section.fields.forEach((field) => {
      const quill = new Quill(`#editor-${field.id}`, {
        theme: 'snow',
        placeholder: field.placeholder,
        modules: this.getEditorConfig(field.id)
      })

      // 设置初始内容
      if (this.documentData[field.id]) {
        quill.root.innerHTML = this.documentData[field.id]
      }

      // 绑定内容变化事件
      quill.on('text-change', () => {
        this.documentData[field.id] = quill.root.innerHTML
        this.updateProgress()
      })

      // 保存编辑器实例
      if (!this.editors) this.editors = {}
      this.editors[field.id] = quill
    })
  }

  getEditorConfig(fieldId) {
    // 根据字段类型返回不同的编辑器配置
    const configs = {
      // 需要表格的字段
      'user_journey': {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean']
        ]
      },
      'competitor_comparison': {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
        ]
      },
      // 需要更多格式的字段
      'prd': {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      },
      // 默认配置
      'default': {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean']
        ]
      }
    }

    return configs[fieldId] || configs['default']
  }

  renderPreview(container, section) {
    // 如果是预览模式，显示所有模块
    if (this.isPreviewMode) {
      this.renderAllModulesPreview(container)
      return
    }

    // 原有的单模块预览逻辑保持不变，但支持HTML内容
    container.innerHTML = section.fields
      .map(
        (field) => `
            <div class="form-group">
                <label class="form-label">${field.label}</label>
                <div style="min-height: 100px; padding: 0.75rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                    <div style="color: #374151; white-space: pre-wrap;">
                        ${this.documentData[field.id] || "<span style='color: #9ca3af; font-style: italic;'>暂未填写</span>"}
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // 添加新方法：渲染所有模块预览
  renderAllModulesPreview(container) {
    const allModulesHtml = Object.keys(this.sections)
      .map((sectionId) => {
        const section = this.sections[sectionId]

        const fieldsHtml = section.fields
          .map(
            (field) => `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">${field.label}</h4>
                <div style="padding: 0.75rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; min-height: 80px;">
                    <div style="color: #374151; white-space: pre-wrap; margin: 0; line-height: 1.5;">
                        ${this.documentData[field.id] || '<span style="color: #9ca3af; font-style: italic;">暂未填写</span>'}
                    </div>
                </div>
            </div>
        `,
          )
          .join("")

        return `
            <div style="margin-bottom: 3rem; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden; background: white;">
                <div style="background: linear-gradient(to right, #f8fafc, #f1f5f9); padding: 1.5rem; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="margin: 0; display: flex; align-items: center; gap: 1rem; font-size: 1.25rem; font-weight: 600;">
                        <div style="background: ${section.color}; color: white; padding: 0.5rem; border-radius: 0.5rem;">
                            <i class="${section.icon}"></i>
                        </div>
                        <span>${sectionId}. ${section.title}</span>
                    </h3>
                </div>
                <div style="padding: 2rem;">
                    ${fieldsHtml}
                </div>
            </div>
        `
      })
      .join("")

    container.innerHTML = `
        <div style="max-width: none;">
            <div style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(to right, #dbeafe, #e0e7ff); border-radius: 1rem;">
                <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: bold; color: #1e40af;">产品开发完整文档预览</h2>
                <p style="margin: 0; color: #6b7280;">以下是您填写的完整产品开发文档内容</p>
            </div>
            ${allModulesHtml}
        </div>
    `
  }

  togglePreviewMode() {
    this.isPreviewMode = !this.isPreviewMode

    const previewBtn = document.getElementById("preview-btn")
    const modeDescription = document.getElementById("mode-description")
    const sectionTitle = document.getElementById("section-title")
    const mainContainer = document.getElementById("main-container")

    if (this.isPreviewMode) {
      previewBtn.innerHTML = '<i class="fas fa-edit"></i> 编辑模式'
      modeDescription.textContent = "预览模式 - 查看所有模块内容"
      sectionTitle.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="background: #2563eb; color: white; padding: 0.5rem; border-radius: 0.5rem;">
                    <i class="fas fa-eye"></i>
                </div>
                <span>文档预览 - 所有模块</span>
            </div>
        `
      // 预览模式时移除侧边栏，让内容占满宽度
      const sidebar = mainContainer.children[0];
      const content = mainContainer.children[1];
      // 保存侧边栏引用以便稍后恢复
      this.savedSidebar = sidebar;
      // 从DOM中移除侧边栏
      mainContainer.removeChild(sidebar);
      // 更改grid模板为单列
      mainContainer.style.gridTemplateColumns = "1fr";
    } else {
      previewBtn.innerHTML = '<i class="fas fa-eye"></i> 预览模式'
      modeDescription.textContent = "编辑模式 - 填写文档内容"
      // 恢复侧边栏
      if (this.savedSidebar && mainContainer.children.length === 1) {
        mainContainer.insertBefore(this.savedSidebar, mainContainer.firstChild);
        // 恢复grid模板为两列
        mainContainer.style.gridTemplateColumns = "1fr 3fr";
        // 清空保存的侧边栏引用
        this.savedSidebar = null;
      }
      // 恢复当前标签页的标题
      const section = this.sections[this.currentTab]
      sectionTitle.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="background: ${section.color}; color: white; padding: 0.5rem; border-radius: 0.5rem;">
                    <i class="${section.icon}"></i>
                </div>
                <span>${this.currentTab}. ${section.title}</span>
            </div>
        `
      // 编辑模式时恢复侧边栏
      const sidebar = mainContainer.children[0];
      const content = mainContainer.children[1];
      // 恢复两列布局
      mainContainer.style.gridTemplateColumns = "1fr 3fr";
      sidebar.style.display = "block";
      // 确保内容区域只占据第二列
      content.style.gridColumn = "2";
      sidebar.style.visibility = "visible"; // 确保完全显示
      // 强制重排以应用样式
      void sidebar.offsetWidth;
    }

    this.renderContent()
  }

  updateProgress() {
    const progressContainer = document.getElementById("progress-container")
    const colors = ["blue", "green", "purple", "orange", "red"]

    progressContainer.innerHTML = Object.keys(this.sections)
      .map((sectionId, index) => {
        const section = this.sections[sectionId]
        const filledFields = section.fields.filter(
          (field) => this.documentData[field.id] && this.documentData[field.id].trim() !== "",
        ).length
        const totalFields = section.fields.length
        const progress = Math.round((filledFields / totalFields) * 100)

        return `
                <div class="progress-item">
                    <div class="progress-circle" style="background: ${section.color};">
                        <i class="${section.icon}"></i>
                    </div>
                    <div class="progress-title">${section.title}</div>
                    <div class="progress-count">${filledFields}/${totalFields}</div>
                    <div class="progress-bar">
                        <div class="progress-fill ${colors[index]}" style="width: ${progress}%;"></div>
                    </div>
                </div>
            `
      })
      .join("")
  }

  loadData() {
    const saved = localStorage.getItem("productDocumentData")
    const data = saved ? JSON.parse(saved) : {}
    this.fileData = data.fileData || {}
    return data.documentData || {}
  }

  saveData() {
    const data = {
      documentData: this.documentData,
      fileData: this.fileData || {}
    }
    localStorage.setItem("productDocumentData", JSON.stringify(data))
    this.showNotification("保存成功", "文档已保存到本地存储")
  }

  exportData() {
    // 创建导出选项弹窗
    this.showExportModal()
  }

  showExportModal() {
    // 创建模态框
    const modal = document.createElement("div")
    modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    backdrop-filter: blur(5px);
  `

    const modalContent = document.createElement("div")
    modalContent.style.cssText = `
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    animation: modalSlideIn 0.3s ease-out;
  `

    // 添加动画样式
    const style = document.createElement("style")
    style.textContent = `
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `
    document.head.appendChild(style)

    modalContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <div style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
        <i class="fas fa-download" style="color: white; font-size: 1.5rem;"></i>
      </div>
      <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: #1f2937;">选择导出格式</h3>
      <p style="color: #6b7280;">请选择您希望导出的文件格式</p>
    </div>
    
    <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
      <button class="export-option" data-format="json" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; background: white; cursor: pointer; transition: all 0.2s ease; text-align: left;">
        <div style="width: 3rem; height: 3rem; background: #fbbf24; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-code" style="color: white; font-size: 1.25rem;"></i>
        </div>
        <div>
          <div style="font-weight: 600; color: #1f2937;">JSON 格式</div>
          <div style="font-size: 0.875rem; color: #6b7280;">结构化数据，便于程序处理</div>
        </div>
      </button>
      
      <button class="export-option" data-format="markdown" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; background: white; cursor: pointer; transition: all 0.2s ease; text-align: left;">
        <div style="width: 3rem; height: 3rem; background: #10b981; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <i class="fab fa-markdown" style="color: white; font-size: 1.25rem;"></i>
        </div>
        <div>
          <div style="font-weight: 600; color: #1f2937;">Markdown 格式</div>
          <div style="font-size: 0.875rem; color: #6b7280;">易读的文本格式，支持格式化</div>
        </div>
      </button>
      
      <button class="export-option" data-format="html" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; background: white; cursor: pointer; transition: all 0.2s ease; text-align: left;">
        <div style="width: 3rem; height: 3rem; background: #ef4444; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <i class="fab fa-html5" style="color: white; font-size: 1.25rem;"></i>
        </div>
        <div>
          <div style="font-weight: 600; color: #1f2937;">HTML 格式</div>
          <div style="font-size: 0.875rem; color: #6b7280;">网页格式，可在浏览器中查看</div>
        </div>
      </button>
      
      <button class="export-option" data-format="txt" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; background: white; cursor: pointer; transition: all 0.2s ease; text-align: left;">
        <div style="width: 3rem; height: 3rem; background: #6b7280; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-file-alt" style="color: white; font-size: 1.25rem;"></i>
        </div>
        <div>
          <div style="font-weight: 600; color: #1f2937;">纯文本格式</div>
          <div style="font-size: 0.875rem; color: #6b7280;">简单的文本文件，兼容性最好</div>
        </div>
      </button>
      
      <button class="export-option" data-format="csv" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; background: white; cursor: pointer; transition: all 0.2s ease; text-align: left;">
        <div style="width: 3rem; height: 3rem; background: #059669; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-table" style="color: white; font-size: 1.25rem;"></i>
        </div>
        <div>
          <div style="font-weight: 600; color: #1f2937;">CSV 格式</div>
          <div style="font-size: 0.875rem; color: #6b7280;">表格数据，可用Excel打开</div>
        </div>
      </button>
    </div>
    
    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button id="cancel-export" style="padding: 0.75rem 1.5rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background: white; color: #374151; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">
        取消
      </button>
    </div>
  `

    modal.appendChild(modalContent)
    document.body.appendChild(modal)

    // 添加样式
    const exportStyle = document.createElement("style")
    exportStyle.textContent = `
    .export-option:hover {
      border-color: #3b82f6 !important;
      background: #f8fafc !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .export-option:active {
      transform: translateY(0);
    }
  `
    document.head.appendChild(exportStyle)

    // 绑定事件
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeModal(modal)
      }
    })

    document.getElementById("cancel-export").addEventListener("click", () => {
      this.closeModal(modal)
    })

    document.querySelectorAll(".export-option").forEach((button) => {
      button.addEventListener("click", (e) => {
        const format = e.currentTarget.dataset.format
        this.closeModal(modal)
        this.performExport(format)
      })
    })
  }

  closeModal(modal) {
    modal.style.animation = "modalSlideOut 0.3s ease-in forwards"
    const style = document.createElement("style")
    style.textContent = `
    @keyframes modalSlideOut {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
    }
  `
    document.head.appendChild(style)

    setTimeout(() => {
      document.body.removeChild(modal)
    }, 300)
  }

  performExport(format) {
    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `product-document-${timestamp}`

    let content, mimeType, extension

    switch (format) {
      case "json":
        content = this.generateJSON()
        mimeType = "application/json"
        extension = "json"
        break
      case "markdown":
        content = this.generateMarkdown()
        mimeType = "text/markdown"
        extension = "md"
        break
      case "html":
        content = this.generateHTML()
        mimeType = "text/html"
        extension = "html"
        break
      case "txt":
        content = this.generateText()
        mimeType = "text/plain"
        extension = "txt"
        break
      case "csv":
        content = this.generateCSV()
        mimeType = "text/csv"
        extension = "csv"
        break
      default:
        content = this.generateJSON()
        mimeType = "application/json"
        extension = "json"
    }

    this.downloadFile(content, `${filename}.${extension}`, mimeType)
    this.showNotification("导出成功", `文档已导出为 ${extension.toUpperCase()} 格式`)
  }

  generateJSON() {
    const exportData = {
      title: "产品开发完整文档",
      timestamp: new Date().toISOString(),
      version: "1.0",
      data: this.documentData,
      sections: Object.keys(this.sections).map((id) => ({
        id,
        title: this.sections[id].title,
        fields: this.sections[id].fields.map((field) => ({
          id: field.id,
          label: field.label,
          value: this.documentData[field.id] || "",
        })),
      })),
    }
    return JSON.stringify(exportData, null, 2)
  }

  generateMarkdown() {
    let markdown = `# 产品开发完整文档\n\n`
    markdown += `**生成时间**: ${new Date().toLocaleString("zh-CN")}\n\n`
    markdown += `---\n\n`

    Object.keys(this.sections).forEach((sectionId) => {
      const section = this.sections[sectionId]
      markdown += `## ${sectionId}. ${section.title}\n\n`

      section.fields.forEach((field) => {
        const value = this.documentData[field.id] || "*暂未填写*"
        markdown += `### ${field.label}\n\n`
        markdown += `${value}\n\n`
      })

      markdown += `---\n\n`
    })

    return markdown
  }

  generateHTML() {
    let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>产品开发完整文档</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 0.5rem; }
        h2 { color: #1f2937; margin-top: 2rem; padding: 1rem; background: #f8fafc; border-left: 4px solid #3b82f6; }
        h3 { color: #374151; margin-top: 1.5rem; }
        .content { background: #f9fafb; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; min-height: 3rem; }
        .empty { color: #9ca3af; font-style: italic; }
        .timestamp { color: #6b7280; font-size: 0.9rem; margin-bottom: 2rem; }
    </style>
</head>
<body>
    <h1>产品开发完整文档</h1>
    <div class="timestamp">生成时间: ${new Date().toLocaleString("zh-CN")}</div>
`

    Object.keys(this.sections).forEach((sectionId) => {
      const section = this.sections[sectionId]
      html += `    <h2>${sectionId}. ${section.title}</h2>\n`

      section.fields.forEach((field) => {
        const value = this.documentData[field.id]
        html += `    <h3>${field.label}</h3>\n`
        if (value && value.trim()) {
          html += `    <div class="content">${value.replace(/\n/g, "<br>")}</div>\n`
        } else {
          html += `    <div class="content empty">暂未填写</div>\n`
        }
      })
    })

    html += `</body>\n</html>`
    return html
  }

  generateText() {
    let text = `产品开发完整文档\n`
    text += `${"=".repeat(20)}\n\n`
    text += `生成时间: ${new Date().toLocaleString("zh-CN")}\n\n`

    Object.keys(this.sections).forEach((sectionId) => {
      const section = this.sections[sectionId]
      text += `${sectionId}. ${section.title}\n`
      text += `${"-".repeat(section.title.length + 3)}\n\n`

      section.fields.forEach((field) => {
        const value = this.documentData[field.id] || "暂未填写"
        text += `${field.label}:\n${value}\n\n`
      })

      text += `\n`
    })

    return text
  }

  generateCSV() {
    let csv = "模块,字段,内容\n"

    Object.keys(this.sections).forEach((sectionId) => {
      const section = this.sections[sectionId]

      section.fields.forEach((field) => {
        const value = this.documentData[field.id] || "暂未填写"
        // 处理CSV中的特殊字符
        const escapedValue = `"${value.replace(/"/g, '""').replace(/\n/g, " ")}"`
        csv += `"${section.title}","${field.label}",${escapedValue}\n`
      })
    })

    return csv
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType + ";charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  showNotification(title, message) {
    // 简单的通知实现
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            min-width: 300px;
        `

    notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.5rem;">${title}</div>
            <div style="color: #6b7280; font-size: 0.875rem;">${message}</div>
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}

// 初始化编辑器
document.addEventListener("DOMContentLoaded", () => {
  new DocumentEditor()
})
