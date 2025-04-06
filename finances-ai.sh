#!/bin/bash
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

directory=/home/tomas/dev/finances-ai
browser=google-chrome

function run
{
  cd $directory
  npm run dev
}

function editor
{
  cursor $directory
}

function deploy
{
  cd $directory
  git push heroku main
}

while getopts "der" option; do
  case $option in     
    d)
      deploy
      exit;;

    e)
      editor
      exit;;

    r)
      run
      exit;;

    \?) 
      echo "Error: invalid option"
      exit;;
  esac
done
