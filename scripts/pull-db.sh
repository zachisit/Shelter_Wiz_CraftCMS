#!/bin/bash

# Pull Database
#
# Pull remote database down from a remote and restore it to local
# Loosely based on craft-scripts by nystudio107

GREEN=`tput setaf 2`
RESET=`tput sgr0`

# Load environmental variables
source "${PWD}/.env"

# Build the remote mysql credentials
REMOTE_DB_CREDS=""
if [ "${REMOTE_DB_USER}" != "" ] ; then
    REMOTE_DB_CREDS+="--user=${REMOTE_DB_USER} "
fi
if [ "${REMOTE_DB_PASSWORD}" != "" ] ; then
    REMOTE_DB_CREDS+="--password=${REMOTE_DB_PASSWORD} "
fi
if [ "${REMOTE_DB_SERVER}" != "" ] ; then
    REMOTE_DB_CREDS+="--host=${REMOTE_DB_SERVER} "
fi
if [ "${REMOTE_DB_PORT}" != "" ] ; then
    REMOTE_DB_CREDS+="--port=${REMOTE_DB_PORT} "
fi
REMOTE_DB_CREDS+="${REMOTE_DB_DATABASE}"
# Build the local mysql credentials
LOCAL_DB_CREDS=""
if [ "${DB_USER}" != "" ] ; then
    LOCAL_DB_CREDS+="--user=${DB_USER} "
fi
if [ "${DB_PASSWORD}" != "" ] ; then
    LOCAL_DB_CREDS+="--password=${DB_PASSWORD} "
fi
if [ "${DB_SERVER}" != "" ] ; then
    LOCAL_DB_CREDS+="--host=${DB_SERVER} "
fi
if [ "${DB_PORT}" != "" ] ; then
    LOCAL_DB_CREDS+="--port=${DB_PORT} "
fi
LOCAL_DB_CREDS+="${DB_DATABASE}"

# Database commands
LOCAL_MYSQL_CMD="docker exec -i dash_mysql_1 mysql"
LOCAL_MYSQLDUMP_CMD="docker exec -i dash_mysql_1 mysqldump"

# Additional mysqldump arguments
MYSQLDUMP_ARGS="--single-transaction --routines --triggers --events --add-drop-database "

# Temporary db dump path (remote & local)
TMP_DB_PATH="/tmp/${REMOTE_DB_DATABASE}-db-dump-$(date '+%Y%m%d').sql"
BACKUP_DB_PATH="/tmp/${DB_DATABASE}-db-backup-$(date '+%Y%m%d').sql"

# Backup the local db
$LOCAL_MYSQLDUMP_CMD $LOCAL_DB_CREDS $MYSQLDUMP_ARGS > "$BACKUP_DB_PATH"
gzip -f "$BACKUP_DB_PATH"
echo "Backed up local database to ${BACKUP_DB_PATH}"

# Get the remote db dump
ssh $REMOTE_SSH_LOGIN -p $REMOTE_SSH_PORT "$REMOTE_MYSQLDUMP_CMD $REMOTE_DB_CREDS $MYSQLDUMP_ARGS > '$TMP_DB_PATH'"
rsync -azvP -e "ssh -p ${REMOTE_SSH_PORT}" "${REMOTE_SSH_LOGIN}:${TMP_DB_PATH}" "${TMP_DB_PATH}"
echo "Downloaded remote database to ${TMP_DB_PATH}"

# Restore the local db from the remote db dump
$LOCAL_MYSQL_CMD $LOCAL_DB_CREDS < $TMP_DB_PATH
echo "✅  ${GREEN} Finished copying remote database to local ${RESET}"

# Normal exit
exit 0
