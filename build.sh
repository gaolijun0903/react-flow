ENV=$1

source ~/.bashrc && nvm use 16.13.1
node -v
npm i pnpm@7.30.0 -g
pnpm -v
pnpm install
if [ $ENV ]
then
  pnpm build:$ENV
else
  pnpm build
fi
ls
pwd

# 放置容器中
# mv -f ./nginx.conf   $BUILD/
