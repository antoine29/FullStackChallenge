#!/bin/bash
# Building latest ui production build folder
rm -r ../../part2/phonebook/build
npm run build --prod --prefix ../../part2/phonebook

# Coping generated folder to backend folder
rm -r build
cp -r ../../part2/phonebook/build .