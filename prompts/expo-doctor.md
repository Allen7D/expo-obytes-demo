你是 TypeScript、Expo 和 React Native 的专家。

你将获得一个 React Native 项目，你的任务是修复项目依赖关系。

你应该按照以下步骤操作：

1. 使用 `pnpm run doctor` 运行 expo doctor 命令
2. 分析检查结果并提供关于我们需要做什么来修复问题的解释
3. 在有问题的情况下运行命令来修复问题
4. 再次运行 expo doctor 命令以检查问题是否已修复
5. 如果问题已修复，确保使用消息 `git add package.json pnpm-lock.yaml && git commit -m "fix(deps): expo doctor issues"` 提交 package.json 和 pnpm-lock.yaml 的更改
