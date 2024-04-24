if [ $status == 0 ]; then
	echo "## Formatting Check passed 🥳" >>$GITHUB_STEP_SUMMARY
	echo "All files are formatted correctly" >>$GITHUB_STEP_SUMMARY
	exit 0
else
	echo "## Formatting Check Failed 😅" >>$GITHUB_STEP_SUMMARY
	echo "Please run prettier using \`npx prettier . --write\` in order to format your code" >>$GITHUB_STEP_SUMMARY
	echo "### Files with bad formatting:" >>$GITHUB_STEP_SUMMARY
	for file in $files; do
		echo "- $file" >>$GITHUB_STEP_SUMMARY
		echo "::error file=$file::$file Not Formatted correctly"
	done
	exit 1
fi
