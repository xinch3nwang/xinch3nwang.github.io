## 大模型调用工具方法简介

以天气查询和日历添加为例：

---

### **1. 基础工具定义**
```python
import json
import requests
from typing import Dict, List, Union
from datetime import datetime

# 模拟的工具库
class ToolKit:
    @staticmethod
    def weather_api(location: str, date: str) -> Dict:
        """调用天气API（模拟实现）"""
        print(f"查询天气: {location} {date}")
        # 实际应替换为真实API调用
        return {
            "rain_prob": 15,  # 降雨概率%
            "temp_range": [18, 22]
        }

    @staticmethod
    def calendar_api(event: str, time: str, reminder: str = None) -> bool:
        """添加日历事件（模拟实现）"""
        print(f"添加日历: {event} at {time} (提醒: {reminder})")
        return True  # 假设总是成功

# 可用工具白名单
TOOLS = {
    "weather_api": ToolKit.weather_api,
    "calendar_api": ToolKit.calendar_api
}
```

---

### **2. 结构化请求处理器**
```python
class ToolExecutor:
    def __init__(self):
        self.tools = TOOLS

    def execute(self, tool_call: Union[str, Dict]) -> Dict:
        """执行单个工具调用"""
        # 解析请求（支持JSON字符串或字典）
        if isinstance(tool_call, str):
            try:
                tool_call = json.loads(tool_call)
            except json.JSONDecodeError:
                return {"error": "Invalid JSON format"}

        # 验证工具调用格式
        if not all(k in tool_call for k in ["tool", "params"]):
            return {"error": "Missing required fields"}

        tool_name = tool_call["tool"]
        params = tool_call.get("params", {})

        # 检查工具是否可用
        if tool_name not in self.tools:
            return {"error": f"Tool '{tool_name}' not available"}

        # 执行工具调用
        try:
            result = self.tools**params
            return {"success": True, "result": result}
        except Exception as e:
            return {"error": str(e)}

    def execute_chain(self, tool_calls: List[Dict]) -> List[Dict]:
        """执行链式工具调用（带依赖关系）"""
        results = []
        context = {}  # 存储中间结果
        
        for call in tool_calls:
            # 替换动态参数（如weather_result.rain_prob）
            resolved_params = self._resolve_params(call["params"], context)
            call["params"] = resolved_params
            
            # 执行并保存结果
            result = self.execute(call)
            results.append(result)
            
            if "result" in result:
                context[f"{call['tool']}_result"] = result["result"]
                
        return results

    def _resolve_params(self, params: Dict, context: Dict) -> Dict:
        """解析条件参数（如weather_result.rain_prob）"""
        resolved = {}
        for k, v in params.items():
            if isinstance(v, str) and '.' in v:  # 检测类似weather_result.rain_prob的引用
                ref_key, ref_field = v.split('.')
                if ref_key in context:
                    resolved[k] = context[ref_key].get(ref_field)
                else:
                    resolved[k] = None
            else:
                resolved[k] = v
        return resolved
```

---

### **3. 模拟大模型输出 & 执行**
```python
# 模拟大模型输出的结构化请求（JSON字符串）
model_output = """
[
  {
    "tool": "weather_api",
    "params": {
      "location": "上海",
      "date": "2023-11-20"
    }
  },
  {
    "tool": "calendar_api",
    "params": {
      "event": "外滩散步",
      "time": "19:00",
      "condition": "weather_result.rain_prob < 30"
    }
  }
]
"""

# 执行流程
if __name__ == "__main__":
    executor = ToolExecutor()
    
    # 步骤1：解析模型输出
    try:
        tool_calls = json.loads(model_output)
    except json.JSONDecodeError as e:
        print("模型输出解析失败:", e)
        exit()

    # 步骤2：执行工具链
    results = executor.execute_chain(tool_calls)
    
    # 步骤3：处理结果
    weather_data = results[0].get("result", {})
    calendar_success = results[1].get("success", False)

    # 生成用户响应
    if weather_data and calendar_success:
        print(f"天气查询成功！降雨概率{weather_data['rain_prob']}%，"
              f"已为您添加日历提醒")
    else:
        print("操作失败，请稍后再试")
```

---

### **4. 执行过程详解**
1. **模型输出解析**  
   ```python
   [
     {
       "tool": "weather_api",
       "params": {"location": "上海", "date": "2023-11-20"}
     },
     {
       "tool": "calendar_api",
       "params": {
         "event": "外滩散步",
         "time": "19:00",
         "condition": "weather_result.rain_prob < 30"
       }
     }
   ]
   ```

2. **依赖关系处理**  
   - 自动检测`weather_result.rain_prob`这样的参数引用  
   - 使用前一个工具的结果填充条件值

3. **实际执行顺序**  
   ```mermaid
   sequenceDiagram
       模型->>执行器: 生成工具调用JSON
       执行器->>天气API: 查询上海天气
       天气API-->>执行器: {rain_prob:15}
       执行器->>日历API: 添加事件(检查15<30)
       日历API-->>执行器: 成功
       执行器->>用户: 最终响应
   ```

---

### **5. 高级功能扩展**
#### 条件执行（动态跳过工具）
```python
# 在execute_chain中添加：
if "condition" in call:
    if not eval(call["condition"], {}, context):
        continue  # 跳过不满足条件的工具
```

#### 异步执行
```python
import asyncio

async def async_execute(tool_call: Dict):
    tool_func = self.tools[tool_call["tool"]]
    if asyncio.iscoroutinefunction(tool_func):
        return await tool_func(**tool_call["params"])
    else:
        return tool_func(**tool_call["params"])
```

#### 类型验证
```python
from pydantic import BaseModel

class WeatherParams(BaseModel):
    location: str
    date: str

def weather_api(params: Dict):
    validated = WeatherParams(**params)  # 自动验证字段类型
    ...
```

---

这个实现完整展示了从大模型输出解析 → 工具调用 → 结果处理的全流程，关键点包括：
1. **安全执行**：工具白名单 + 参数验证  
2. **依赖处理**：自动解析跨工具的参数引用  
3. **错误隔离**：单个工具失败不影响整个链  
4. **可扩展性**：轻松添加新工具  

实际生产环境还需添加：  
- 工具调用限流  
- 敏感参数过滤  
- 更完善的错误日志