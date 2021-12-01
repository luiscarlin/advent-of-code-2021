#!/usr/bin/env bash

# usage: ./new.sh <day>

set -euo pipefail

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

DAY=$1

printf "Setting things up for day ${DAY}\n"

printf "\tremoving folder if exists..."
rm -rf ${PROJECT_DIR}/${DAY}
printf "DONE!\n"

printf "\tcreating new folder..."
cp -rn ${PROJECT_DIR}/0 ${PROJECT_DIR}/${DAY}
printf "DONE!\n"

printf "\trenaming files..."
pushd ${PROJECT_DIR}/${DAY} > /dev/null 
mv 0.in ${DAY}.in
mv 0.ts ${DAY}.ts
popd > /dev/null 
printf "DONE!\n"

printf "\treplacing template strings..."
pushd ${PROJECT_DIR}/${DAY} > /dev/null 
sed -i '' "s/%DAY_NUM%/$DAY/g" $DAY.ts
popd > /dev/null 
printf "DONE!\n"
