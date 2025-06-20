#!/bin/bash
cd /home/kavia/workspace/code-generation/hairfit-pro-64459-5a4c92b7/hairfit_pro_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

