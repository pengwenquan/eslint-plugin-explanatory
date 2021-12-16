/**
 * @fileoverview a rule to check explanatory note content
 * @author pwquan
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "a rule to check explanatory note content: cannot cantain words like fixme ", // 规则描述
      category: "lines-around-comment", // 分类：代表注释
    },
    schema: [ // 指定该选项 这样的 ESLint 可以避免无效的规则配置
      {
        "keyWords": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    ],
  },

  create(context) {
    
    // 取得设置的keywords
    let [argv0] = context.options
    let keyWords = argv0 ? argv0.keyWords ? argv0.keyWords.length > 0 ? argv0.keyWords : undefined : undefined : undefined

    // 没有设置则使用默认的
    let notAllowWords = keyWords || ['fixme', 'fix', 'fixit', 'todo']

    // 忽略大小写
    notAllowWords = notAllowWords.map(v => v.toLowerCase())

    // context对象包含与规则上下文相关的信息
    // 返回一个SourceCode对象，你可以使用该对象处理传递给 ESLint 的源代码
    const sourceCode = context.getSourceCode()
    // 获取所有的注释内容
    let comments = sourceCode.getAllComments()

    return {
      Program() {
        // 获取所有注释的节点
        // 遍历注释节点判断是否有不符合规范的
        comments.forEach(comment => {
          let { value } = comment
          value = value.toLowerCase()
          let warnWord = ''
          // 判断注释内容是否包含不被允许的word
          for (const word of notAllowWords) {
              if (value.includes(word)) {
                  warnWord = word
              }
          }

          if (warnWord) {
              context.report({
                  loc: comment.loc, // 报错位置范围
                  message: `The comment contains the keyword "${warnWord}", please check it carefully before commit the code` // 有问题发出的消息
              })
          }
        })
      }
    };
  },
};
