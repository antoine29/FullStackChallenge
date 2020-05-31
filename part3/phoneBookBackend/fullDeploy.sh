#!/bin/bash
sh buildUI.sh
git add .
git commit -m "new UI production build folder created"
sh deploy.sh