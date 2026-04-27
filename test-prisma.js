const { execSync } = require('child_process');
const fs = require('fs');
try {
  execSync('npx prisma validate', { stdio: 'pipe' });
  console.log('Valid!');
} catch (e) {
  fs.writeFileSync('err.json', JSON.stringify({ out: e.stdout.toString(), err: e.stderr.toString() }));
}
