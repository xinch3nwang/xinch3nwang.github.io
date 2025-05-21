# **Linux常用命令详解**

------

## **一、文件与日志操作**

#### **1. 文件搜索与查看**

- **`find` 命令**
  ​**​语法​**​：`find [路径] [条件] [操作]`
  ​**​测试场景示例​**​：

  ```
  # 查找测试目录中所有 .log 文件
  find /test_env -name "*.log"                 
  
  # 查找最近7天修改过的配置文件
  find /etc -name "*.conf" -mtime -7           
  
  # 查找大于100MB的日志文件（清理空间）
  find /var/log -type f -size +100M            
  
  # 将找到的文件复制到备份目录
  find . -name "*.json" -exec cp {} /backup \; 
  ```

- **`cat` 命令**
  ​**​语法​**​：`cat [选项] 文件`
  ​**​测试场景示例​**​：

  ```
  cat config.yml                # 查看配置文件内容
  cat log1.txt log2.txt > merged.log  # 合并多个日志文件
  cat -n app.log | grep "ERROR" # 显示行号并过滤错误（精准定位）
  ```

------

#### **2. 日志过滤与分析**

- **`grep` 命令**
  ​**​语法​**​：`grep [选项] "模式" 文件`
  ​**​测试场景示例​**​：

  ```
  grep -i "warning" system.log  # 忽略大小写过滤警告
  grep -A 2 "Exception" error.log  # 显示匹配行及其后2行（上下文）
  grep -v "INFO" app.log         # 排除所有INFO级别日志（只关注错误）
  
  # 统计接口响应时间超过1秒的次数
  cat api.log | grep "response_time" | awk '$3 > 1000 {print}' | wc -l  
  ```

- **`tail` 命令**
  ​**​语法​**​：`tail [选项] 文件`
  ​**​测试场景示例​**​：

  ```
  tail -n 50 debug.log          # 查看日志最后50行
  tail -f api.log | grep "500"  # 实时监控HTTP 500错误
  tail -s 5 -f test.log         # 每5秒刷新一次日志（降低CPU占用）
  ```

------

## **二、进程管理与资源监控**

#### **1. 进程查看与操作**

- **`ps` 命令**
  ​**​语法​**​：`ps [选项]`
  ​**​测试场景示例​**​：

  ```
  ps aux | grep "chrome"        # 查看所有Chrome进程（自动化测试常用）
  ps -ef --forest               # 树形显示进程关系（分析父子进程）
  ps -o pid,%cpu,cmd --sort=-%cpu | head  # 按CPU占用排序进程
  ```

- **`kill` 命令**
  ​**​语法​**​：`kill [信号] PID` 或 `pkill [选项] 进程名`
  ​**​测试场景示例​**​：

  ```
  kill -9 $(pgrep "firefox")    # 强制终止所有Firefox进程
  pkill -f "test_runner.py"     # 根据脚本名终止进程
  killall -HUP nginx            # 优雅重启Nginx服务（重载配置）
  ```

- **`top` 命令**
  ​**​语法​**​：`top [选项]`

  **​关键交互操作​**​：

  - `P`：按CPU排序，`M`：按内存排序，`c`：显示完整命令，`k`：终止进程​

  **测试场景示例​**​：

  ```
  top -p 1234,5678             # 监控指定PID的进程（精准观察）
  top -b -n 3 > top_report.txt  # 将top结果保存到文件（用于离线分析）
  ```

------

#### **2. 网络与端口管理**

- **`lsof` 命令**
  ​**​语法​**​：`lsof [选项]`
  ​**​测试场景示例​**​：

  ```
  lsof -i :8080               # 查看占用8080端口的进程（替代netstat）
  lsof -u appuser              # 列出某用户打开的所有文件
  lsof /var/log/app.log        # 查看谁在读写指定日志文件（排查锁文件问题）
  ```

- **`netstat`/`ss` 命令**
  ​**​语法​**​：`netstat [选项]` 或 `ss [选项]`
  ​**​测试场景示例​**​：

  ```
  netstat -tulnp | grep ":80"  # 查看占用80端口的进程（旧版系统）
  ss -s                        # 统计连接状态（查看TIME_WAIT数量）
  ss -tlnp | grep "java"       # 查看Java服务的监听端口（新版推荐）
  ```

- **`ifconfig`/`ip` 命令**
  ​**​语法​**​：`ifconfig` 或 `ip addr`（新版推荐）
  ​**​测试场景示例​**​：

  ```
  ifconfig eth0                # 查看网卡配置（旧版）
  ip addr show                 # 查看所有网络接口信息（新版）
  ip route show                # 查看路由表（排查网络不通问题）
  ```

------

## **三、网络请求与接口测试**

#### **1. 发送HTTP请求**

- `curl` 命令

  **语法**：`curl [选项] URL`
  **测试场景示例**：

  ```
  # 发送带Header的POST请求（测试鉴权接口）
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer token" \
       -d '{"param": "value"}' http://api:8080/test
  
  # 下载文件并限速（模拟弱网环境）
  curl --limit-rate 100k -O http://example.com/large_file.zip
  
  # 测试接口响应时间（性能测试）
  curl -o /dev/null -s -w "响应时间: %{time_total}s\n" http://api/ping
  ```

------

## **四、组合命令与场景实战**

#### **1. 复杂问题排查案例**

**场景**：测试服务器磁盘突然爆满
​**​排查步骤​**​：

1. 快速定位大文件：

   ```
   du -h / | sort -rh | head -n 20    # 查找根目录下前20大文件
   ```

2. 清理过期日志：

   ```
   find /var/log -name "*.log" -mtime +30 -exec rm {} \;  # 删除30天前的日志
   ```

3. 监控磁盘变化（实时）：

   ```
   watch -n 5 "df -h /tmp"           # 每5秒刷新/tmp目录的磁盘使用
   ```

#### **2. 自动化测试辅助命令**

```
# 批量执行测试用例并记录结果
for test_case in test_*.sh; do
  echo "Running $test_case..."
  ./$test_case >> test_results.txt 2>&1
done

# 检查所有测试是否通过
if grep -q "FAIL" test_results.txt; then
  echo "❌ 存在失败的测试用例！"
else
  echo "✅ 所有测试通过！"
fi
```

------

## **五、面试回答模板**

在面试中，回答 **"Linux的常用命令有哪些？"** 时，建议采用 **"结构化+场景化"** 的方式，避免单纯罗列命令，而是结合测试工作场景，展示你的 **实际应用能力**。



#### **1. 分类概述（先给框架）**

> **"在测试工作中，我常用的Linux命令主要分为4类：**
> ​**​① 日志分析​**​（定位Bug）、​**​② 环境管理​**​（部署/维护）、​**​③ 性能监控​**​（资源排查）、​**​④ 自动化辅助​**​（脚本/任务）。
> 我结合具体场景来说明..."

#### **2. 举例说明（重点突出场景）**

> **（1）日志分析**
>
> - **`grep "ERROR" app.log`** → 快速过滤错误日志，比如在Jenkins构建失败时定位问题。
> - **`tail -f debug.log`** → 实时监控日志，适用于复现偶现Bug。
> - **`sed -n '/10:00:00/,/11:00:00/p' log`** → 提取特定时间段的日志，用于时间敏感型问题排查。
>
> **（2）环境管理**
>
> - **`ps aux | grep selenium`** → 检查自动化测试进程是否存活。
> - **`scp report.html user@server:/reports`** → 将测试结果上传到中央服务器。
> - **`chmod +x run_test.sh`** → 给测试脚本添加执行权限。
>
> **（3）性能监控**
>
> - **`top -o %CPU`** → 发现CPU占用高的进程（如内存泄漏）。
> - **`free -h`** → 检查剩余内存，防止OOM（Out of Memory）导致测试中断。
> - **`netstat -tuln | grep 8080`** → 确认测试服务的端口是否被占用。
>
> **（4）自动化辅助**
>
> - **`crontab -e`** → 设置定时任务，比如每天凌晨执行回归测试。
> - **`nohup ./run_test.sh &`** → 后台运行长时间测试任务。

#### **3. 结合案例（展示实战经验）**

> **"比如有一次，我们的自动化测试突然卡住，我通过 `top` 发现某个Java进程CPU占用99%，再用 `jstack ` 分析线程栈，发现是死循环问题，最终定位到测试脚本的逻辑错误。"**
> （这样回答能体现 ​**​问题排查能力​**​，而不只是背命令）

------

### **💡 面试技巧**

1. **不要死记硬背**：面试官可能追问 **"这个命令的参数是什么意思？你实际怎么用的？"**
   - ✅ 示例：`tail -f` 的 `-f` 是 **follow（实时追踪）**，我常用它监控测试执行时的实时日志。
   - ❌ 错误：只回答 `tail` 但不解释用途。
2. **关联测试流程**：
   - **"在接口测试中，我用 `curl` 发送请求并检查响应；在UI自动化测试时，用 `ps` 确保浏览器进程正常。"**
3. **适当延伸**：
   - 如果面试官感兴趣，可以补充：
     - **`awk`** 统计日志中的错误次数
     - **`jq`** 解析JSON格式的测试报告
     - **`docker ps`** 管理测试容器

------

### **🎯 一句话总结**

**"分类清晰 + 场景举例 + 实战故事"** = 让面试官看到你的 **实际经验**，而不仅是知识储备。