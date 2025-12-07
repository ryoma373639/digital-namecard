#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { parse } from 'yaml';

const execAsync = promisify(exec);

// YAML parser (simple implementation)
function parseYAML(content) {
  try {
    // Try to use js-yaml if available
    const yaml = await import('js-yaml');
    return yaml.load(content);
  } catch {
    // Fallback: simple YAML parsing
    return simpleYAMLParse(content);
  }
}

function simpleYAMLParse(content) {
  const lines = content.split('\n');
  const result = { issues: [] };
  let currentIssue = null;
  let currentArray = null;
  let indentLevel = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);

    if (trimmed.startsWith('- title:')) {
      if (currentIssue) {
        result.issues.push(currentIssue);
      }
      currentIssue = {
        title: trimmed.match(/- title:\s*"(.+?)"/)[1],
        requirements: [],
        tech_stack: []
      };
      currentArray = null;
    } else if (currentIssue) {
      if (trimmed.startsWith('type:')) {
        currentIssue.type = trimmed.split(':')[1].trim();
      } else if (trimmed.startsWith('priority:')) {
        currentIssue.priority = trimmed.split(':')[1].trim();
      } else if (trimmed.startsWith('autoExecute:')) {
        currentIssue.autoExecute = trimmed.split(':')[1].trim() === 'true';
      } else if (trimmed.startsWith('requirements:')) {
        currentArray = 'requirements';
      } else if (trimmed.startsWith('tech_stack:')) {
        currentArray = 'tech_stack';
      } else if (trimmed.startsWith('constraints:')) {
        currentArray = 'constraints';
        currentIssue.constraints = [];
      } else if (trimmed.startsWith('- ') && currentArray) {
        const value = trimmed.substring(2);
        if (currentArray === 'constraints' && !currentIssue.constraints) {
          currentIssue.constraints = [];
        }
        if (currentIssue[currentArray]) {
          currentIssue[currentArray].push(value);
        }
      }
    }
  }

  if (currentIssue) {
    result.issues.push(currentIssue);
  }

  return result;
}

async function createGitHubIssue(issue, index, total) {
  console.log(`\n📝 Creating Issue ${index}/${total}: ${issue.title}`);

  // Build issue body
  let body = `# ${issue.type ? `[${issue.type}]` : ''} ${issue.title}\n\n`;

  if (issue.requirements && issue.requirements.length > 0) {
    body += `## 📋 要件\n\n`;
    issue.requirements.forEach(req => {
      body += `- [ ] ${req}\n`;
    });
    body += '\n';
  }

  if (issue.tech_stack && issue.tech_stack.length > 0) {
    body += `## 🛠️ 技術スタック\n\n`;
    issue.tech_stack.forEach(tech => {
      body += `- ${tech}\n`;
    });
    body += '\n';
  }

  if (issue.constraints && issue.constraints.length > 0) {
    body += `## ⚠️ 制約事項\n\n`;
    issue.constraints.forEach(constraint => {
      body += `- ${constraint}\n`;
    });
    body += '\n';
  }

  body += `## 📊 成功条件\n\n`;
  body += `- [ ] TypeScript エラー: 0件\n`;
  body += `- [ ] テストカバレッジ: ≥80%\n`;
  body += `- [ ] 品質スコア: ≥80点\n`;
  body += `- [ ] セキュリティスキャン: 脆弱性0件\n\n`;

  if (issue.autoExecute) {
    body += `## 🤖 Agent実行設定\n\n`;
    body += `- **自動実行**: 有効\n`;
    body += `- **優先度**: ${issue.priority}\n`;
    body += `- **期待実行時間**: 3-5分\n\n`;
  }

  body += `---\n\n`;
  body += `🤖 Generated with [Claude Code](https://claude.com/claude-code)\n`;

  // Build labels
  const labels = [];

  // Type label
  if (issue.type) {
    const typeEmoji = {
      'feature': '✨',
      'bug': '🐛',
      'refactor': '♻️',
      'docs': '📚',
      'test': '🧪',
      'performance': '⚡'
    };
    labels.push(`${typeEmoji[issue.type] || ''}type:${issue.type}`);
  }

  // Priority label
  if (issue.priority) {
    const priorityMap = {
      'high': 'priority:P1-High',
      'medium': 'priority:P2-Medium',
      'low': 'priority:P3-Low'
    };
    labels.push(priorityMap[issue.priority] || 'priority:P2-Medium');
  }

  // Agent execution label
  if (issue.autoExecute) {
    labels.push('🤖agent:codegen');
    labels.push('state:pending');
  }

  // Create issue using gh CLI
  try {
    const labelStr = labels.join(',');
    const escapedBody = body.replace(/"/g, '\\"').replace(/\$/g, '\\$');

    // Use heredoc for proper formatting
    const cmd = `gh issue create \\
      --title "${issue.title}" \\
      --body "${escapedBody}" \\
      --label "${labelStr}" \\
      --repo ryoma373639/digital-namecard`;

    const { stdout, stderr } = await execAsync(cmd, {
      cwd: '/Users/nishitanitoshihiko/Downloads/digital-namecard'
    });

    console.log(`✅ Issue created: ${stdout.trim()}`);

    if (issue.autoExecute) {
      console.log(`🤖 Agent execution enabled`);
    }

    return stdout.trim();
  } catch (error) {
    console.error(`❌ Failed to create issue: ${error.message}`);
    throw error;
  }
}

async function main() {
  const yamlPath = '/Users/nishitanitoshihiko/Downloads/digital-namecard/issues.yaml';

  if (!existsSync(yamlPath)) {
    console.error('❌ issues.yaml not found');
    process.exit(1);
  }

  console.log('🤖 Batch Issue Creator\n');
  console.log(`Reading ${yamlPath}...`);

  const content = readFileSync(yamlPath, 'utf-8');
  const data = simpleYAMLParse(content);

  if (!data.issues || data.issues.length === 0) {
    console.error('❌ No issues found in YAML file');
    process.exit(1);
  }

  console.log(`Found ${data.issues.length} issues to create\n`);

  const results = [];
  let successCount = 0;
  let autoExecuteCount = 0;

  for (let i = 0; i < data.issues.length; i++) {
    const issue = data.issues[i];
    try {
      const url = await createGitHubIssue(issue, i + 1, data.issues.length);
      results.push({ title: issue.title, url, success: true });
      successCount++;
      if (issue.autoExecute) {
        autoExecuteCount++;
      }
    } catch (error) {
      results.push({ title: issue.title, error: error.message, success: false });
    }

    // Wait between requests to avoid rate limiting
    if (i < data.issues.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n✅ Batch creation complete`);
  console.log(`Created: ${successCount}/${data.issues.length} issues`);
  console.log(`Agent auto-execute: ${autoExecuteCount} issues`);
  console.log(`\nResults:`);
  results.forEach((r, i) => {
    if (r.success) {
      console.log(`  ${i + 1}. ✅ ${r.title}`);
      console.log(`     ${r.url}`);
    } else {
      console.log(`  ${i + 1}. ❌ ${r.title}`);
      console.log(`     Error: ${r.error}`);
    }
  });
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
