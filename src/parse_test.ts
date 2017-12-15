import test from './test'
import parse from './parse'

const it = test(__filename)

it(
  'should parse singular',
  parse(' 1 file changed, 1 insertion(+), 1 deletion(-)'),
  {
    insertions: 1,
    deletions: 1,
    filesChanged: 1
  }
)

it(
  'should parse plural',
  parse(' 22 files changed, 22 insertions(+), 22 deletions(-)'),
  {
    insertions: 22,
    deletions: 22,
    filesChanged: 22
  }
)

it('should ignore commit messages', parse('60a200e 1 file changed'), {
  insertions: 0,
  deletions: 0,
  filesChanged: 0
})
