import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          tabWidth: 2,
          printWidth: 80,
          singleQuote: true,
          endOfLine: 'auto',
          trailingComma: 'none',
          htmlWhitespaceSensitivity: 'ignore'
        }
      ],
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }]
    }
  }
]
