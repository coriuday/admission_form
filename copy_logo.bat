@echo off
if not exist "public" mkdir public
copy /Y "items\GNU_Logo_PDF_page-0001-removebg-preview.png" "public\gnu-logo.png"
echo Done! Logo copied to public folder.
dir public
