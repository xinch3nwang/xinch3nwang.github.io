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
            <div class="form-group">
                <label class="form-label" for="${field.id}">${field.label}</label>
                <textarea 
                    class="form-textarea" 
                    id="${field.id}" 
                    placeholder="${field.placeholder}"
                    rows="4"
                >${this.documentData[field.id] || ""}</textarea>
            </div>
        `,
      )
      .join("")

    // 绑定输入事件
    section.fields.forEach((field) => {
      const textarea = document.getElementById(field.id)
      textarea.addEventListener("input", (e) => {
        this.documentData[field.id] = e.target.value
        this.updateProgress()
      })
    })
  }

  renderPreview(container, section) {
    // 如果是预览模式，显示所有模块
    if (this.isPreviewMode) {
      this.renderAllModulesPreview(container)
      return
    }

    // 原有的单模块预览逻辑保持不变
    container.innerHTML = section.fields
      .map(
        (field) => `
            <div class="form-group">
                <label class="form-label">${field.label}</label>
                <div style="min-height: 100px; padding: 0.75rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                    <p style="color: #374151; white-space: pre-wrap;">${this.documentData[field.id] || "暂未填写"}</p>
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
                    <p style="color: #374151; white-space: pre-wrap; margin: 0; line-height: 1.5;">
                        ${this.documentData[field.id] || '<span style="color: #9ca3af; font-style: italic;">暂未填写</span>'}
                    </p>
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
    return saved ? JSON.parse(saved) : {}
  }

  saveData() {
    localStorage.setItem("productDocumentData", JSON.stringify(this.documentData))
    this.showNotification("保存成功", "文档已保存到本地存储")
  }

  exportData() {
    const exportData = {
      title: "产品开发完整文档",
      timestamp: new Date().toISOString(),
      data: this.documentData,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `product-document-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    this.showNotification("导出成功", "文档已导出为JSON文件")
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
