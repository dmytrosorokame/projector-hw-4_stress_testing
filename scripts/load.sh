#!/bin/bash

TIME=120s
CONCURRENT=255

echo "[API] Starting testing with $CONCURRENCY concurrency abd $TIME time."
siege -c$CONCURRENT -t$TIME -f scripts/urls.txt
echo "[API] Stress testing is finished."