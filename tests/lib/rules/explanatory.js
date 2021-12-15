/**
 * @fileoverview a rule to check explanatory note content
 * @author pwquan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/explanatory"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 7, // 默认支持语法为es5 
  },
});
ruleTester.run("explanatory", rule, {
  valid: [
    "// give me some code that won't trigger a warning",
    `/**
     * nihaode 是快乐的反馈
     */`,
    "// 机开绿灯飞机dsfdsfds"
  ],

  invalid: [
    {
      code: "// xxx",
      errors: [{ message: '注释中含有不被允许的字符xxx' }],
    },
    {
      code: "// Fixme",
      errors: [{ message: '注释中含有不被允许的字符fixme' }],
    },
    {
      code: `/**
      * nihaode 是快乐的反馈 的fixme
      */`,
      errors: [{ message: '注释中含有不被允许的字符fixme' }],
    },
  ],
});
