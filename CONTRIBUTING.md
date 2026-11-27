# 贡献指南

## 提交身份

提交记录会带上作者邮箱，能看到仓库的人都能看到这个邮箱。因此，提交的作者（author）和提交者（committer）统一使用 GitHub 提供的 noreply 地址，不使用工作邮箱或个人邮箱。代码、文档、示例和提交信息里也不要写这类邮箱。

noreply 地址的格式是：

```
<用户ID>+<用户名>@users.noreply.github.com
```

维护者 `JIeJaitt` 的地址是 `77219045+JIeJaitt@users.noreply.github.com`。

在仓库根目录执行下面两条命令。它们只写入本仓库的配置，不改全局配置：

```bash
git config user.name "JIeJaitt"
git config user.email "77219045+JIeJaitt@users.noreply.github.com"
```

查看当前生效的身份：

```bash
git config user.name
git config user.email
```

其他贡献者把用户名和用户 ID 换成自己的。用户 ID 可以用 `gh` 查询：

```bash
gh api users/<用户名> --jq .id
```

## 提交信息

标题使用 `类型: 描述` 的格式，与现有历史保持一致，例如：

```
feat: scaffold the local agent workbench
```
