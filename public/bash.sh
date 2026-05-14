#!/usr/bin/env bash
#
# Output resume in terminal
# Heavily inspired by ysap.sh
#

set -e
shopt -s extglob

COLOR1=$'\e[38;5;87m'  # cyan
COLOR3=$'\e[38;5;120m' # green
COLOR4=$'\e[38;5;241m' # dim
COLOR5=$'\e[38;5;223m' # off-white (text)
BOLD=$'\e[1m'
ITALIC=$'\e[3m'
RST=$'\e[0m'

fatal() {
	echo '[FATAL]' "$*" >&2
	exit 1
}

# example: repeat '=' 50
repeat() {
	local pad
	printf -v pad "%*s" "$2" ""
	printf "%s" "${pad// /$1}"
}

# example: printable-len thing.txt
printable-len() {
	local stripped=${1//$'\e'[\[(]*([0-9;])[@-n]/}
	echo "${#stripped}"
}

# example: cat thing.txt | rtrim
rtrim() {
	local line
	while IFS= read -r line || [[ -n $line ]]; do
		line=${line%%*([ ]|"$RST")}
		echo "$line$RST"
	done
}

box() {
	local title=
	local separator=
	local ypadding=0
	local xpadding=0
	local color=''
	local title_color=
	local theme='unicode'

	while getopts "t:s:y:x:c:C:T:" opt; do
		case "$opt" in
		t) title=$OPTARG ;;
		s) separator=$OPTARG ;;
		y) ypadding=$OPTARG ;;
		x) xpadding=$OPTARG ;;
		c) color=$OPTARG ;;
		C) title_color=$OPTARG ;;
		T) theme=$OPTARG ;;
		*) fatal "invalid argument: -$OPTARG" ;;
		esac
	done
	shift $((OPTIND - 1))

	local -a charset
	case "$theme" in
	unicode)
		charset=('─' '│' '┌' '└' '┐' '┘' '┬' '┴')
		;;
	ascii)
		charset=('-' '|' '+' '+' '+' '+' '+' '+')
		;;
	plain)
		charset=(' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ')
		;;
	*) fatal "invalid theme name: $theme" ;;
	esac

	local WE="${charset[0]}"
	local NS="${charset[1]}"
	local SE="${charset[2]}"
	local NE="${charset[3]}"
	local SW="${charset[4]}"
	local NW="${charset[5]}"
	local SWE="${charset[6]}"
	local NWE="${charset[7]}"

	# read the entire input first
	local -a input
	mapfile -t input

	# process input
	local num_cols=1 line len i
	local -a max_len=() cells

	# calculate length for each line
	for line in "${input[@]}"; do
		# calculate length for each cell
		IFS="$separator" read -ra cells <<<"$line"
		for i in "${!cells[@]}"; do
			((len = $(printable-len "${cells[i]}") + xpadding * 2))

			# get max for each col
			if ((len > max_len[i])); then
				max_len[i]=$len
			fi

			# get total cols
			if ((i + 1 > num_cols)); then
				((num_cols = i + 1))
			fi
		done
	done

	# top part
	line=$color$SE
	for ((i = 0; i < num_cols; i++)); do
		line+=$(repeat "$WE" "${max_len[i]}")

		# add vertical separator
		if ((i < num_cols - 1)); then
			line+=$SWE
		fi
	done
	line+=$SW$RST

	# insert title
	if [[ -n $title ]]; then
		((len = ${#color} + ${#SE} + ${#WE}))

		title=$title_color$title$RST
		line="${line:0:len}$title${line:$((len + $(printable-len "$title")))}"
	fi
	echo "$line"

	# add vertical padding
	local -a ypad
	for ((i = 0; i < ypadding; i++)); do
		ypad+=("$(repeat "$separator" "$num_cols")")
	done
	input=("${ypad[@]}" "${input[@]}" "${ypad[@]}")

	# add horizontal padding
	local xpad
	xpad=$(repeat ' ' "$xpadding")

	# read each line
	for line in "${input[@]}"; do
		IFS="$separator" read -ra cells <<<"$line"

		# read each cell
		line=$color$NS$RST
		for ((i = 0; i < num_cols; i++)); do
			cell=$xpad${cells[i]}$xpad
			line+=$cell

			# left pad
			line+=$(repeat ' ' "$((max_len[i] - $(printable-len "$cell")))")

			line+=$RST$color$NS$RST
		done

		# print line
		echo "$line"
	done

	# bottom line
	line=$color$NE
	for ((i = 0; i < num_cols; i++)); do
		line+=$(repeat "$WE" "${max_len[i]}")

		# add vertical separator
		if ((i < num_cols - 1)); then
			line+=$NWE
		fi
	done
	line+=$NW$RST
	echo "$line"
}

# https://patorjk.com/software/taag/#p=display&f=Small%20Block&t=Eiguchi%20Pablo&x=none
mapfile -t NAME <<-EOF
	▛▀▘▗          ▌  ▗  ▛▀▖   ▌  ▜    
	▙▄ ▄ ▞▀▌▌ ▌▞▀▖▛▀▖▄  ▙▄▘▝▀▖▛▀▖▐ ▞▀▖
	▌  ▐ ▚▄▌▌ ▌▌ ▖▌ ▌▐  ▌  ▞▀▌▌ ▌▐ ▌ ▌
	▀▀▘▀▘▗▄▘▝▀▘▝▀ ▘ ▘▀▘ ▘  ▝▀▘▀▀  ▘▝▀ 
EOF

mapfile -t CONTACT <<-EOF
	${COLOR5}${BOLD}DEVELOPER

	${COLOR5}Yokohama, Japan
	${COLOR1}${ITALIC}eiguchipablo.dev
EOF

mapfile -t ABOUT <<EOF
${BOLD}HELLO!${RST}
I'm a Japanese-Argentinian developer
mainly focused on Next/React and
TypeScript. I like to learn new
technologies and keep improving
as developer.
EOF

mapfile -t SKILLS <<EOF
Frontend:|${ITALIC}JS/TS, React/Next, Tailwind
Backend:|${ITALIC}Node, Express, Golang
Tools:|${ITALIC}Bash, SQL
Other:|${ITALIC}Three.js, React Native
EOF

mapfile -t QR <<-EOF
	 █▀▀▀▀▀█ ▄▄▄█▄ █▀▀▀▀▀█ 
	 █ ███ █ ▄█ ██ █ ███ █ 
	 █ ▀▀▀ █ ▄▄█▄▄ █ ▀▀▀ █ 
	 ▀▀▀▀▀▀▀ ▀ █ █ ▀▀▀▀▀▀▀ 
	 ▀█▀▀█ ▀██▀▄▀▀▀ ▀▄▀ ▀▄ 
	 ▀ ▀█  ▀▀▀█▄▀▀▄   ███  
	 ▀▀▀▀ ▀▀ █ █▀  ▀██▄▄▀▄ 
	 █▀▀▀▀▀█ ▀▀█▄▀█ ▄ █▄▀  
	 █ ███ █ ███▀  ▀███▄▄  
	 █ ▀▀▀ █ █▄ ▀█▄▀ ▄██   
	 ▀▀▀▀▀▀▀ ▀▀ ▀  ▀▀   ▀  
	${COLOR3}${BOLD}\$ curl${RST} ${COLOR5}eiguchipablo.dev
EOF

# generate output
{
	# print header
	for ((i = 0; i < ${#NAME[@]} || i < ${#CONTACT[@]}; i++)); do
		echo "${COLOR5}${NAME[i]:-$(repeat ' ' "$(printable-len "${NAME[0]}")")}|${CONTACT[i]}"
	done | box -y 1 -x 8 -s "|" -T plain

	# generate about
	mapfile -t aboutbox < <(
		printf '%s\n' "${ABOUT[@]}" | box -y 1 -x 1 -t " About " -C "$COLOR4"
	)

	# generate skills
	mapfile -t skillsbox < <(
		echo
		printf '%s\n' "${SKILLS[@]}" | box -y 1 -x 1 -t " Skills " -C "$COLOR4" -s "|"
	)

	# join and print them both
	for ((i = 0; i < ${#aboutbox[@]} || i < ${#skillsbox[@]}; i++)); do
		echo "${aboutbox[i]:-$(repeat ' ' "$(printable-len "${aboutbox[0]}")")}  ${skillsbox[i]}"
	done

	# print qr
	printf '%s\n' "${QR[@]}" | box -x 30 -T plain
} | rtrim
