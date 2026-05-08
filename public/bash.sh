#!/usr/bin/env bash
#
# Output resume in terminal
# Heavily inspired by ysap.sh
#
# Author: Eiguchi Pablo <eiguchi.pablo@gmail.com>

set -e

COLOR1=$'\x1b[38;5;87m'  # cyan
COLOR3=$'\x1b[38;5;120m' # green
COLOR4=$'\x1b[38;5;241m' # dim
COLOR5=$'\x1b[38;5;223m' # off-white (text)
BOLD=$'\033[1m'
RST=$'\x1b[0m'

fatal() {
	echo '[FATAL]' "$@" >&2
	exit 1
}

# example: repeat '=' 50
repeat() {
	printf -v s "%*s" "$2" ""
	printf "%s" "${s// /$1}"
}

# example: cat thing.txt | strip-ansi
strip-ansi() (
	shopt -s extglob
	local line

	while IFS= read -r line || [[ -n $line ]]; do
		printf '%s\n' "${line//$'\e'[\[(]*([0-9;])[@-n]/}"
	done
)

printable-len() {
	local len
	len=$(strip-ansi <<<"$1")
	echo ${#len}
}

# example: cat thing.txt | rtrim
rtrim() (
	shopt -s extglob
	local line

	while IFS= read -r line || [[ -n $line ]]; do
		while [[ $line == *"$RST" ]] || [[ $line == *' ' ]]; do
			line=${line%"$RST"}
			line=${line%%+([ ])}
		done
		echo "$line$RST"
	done
)

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

	local WE NS SE NE SW NW SWE NWE
	case "$theme" in
	unicode)
		WE='─'
		NS='│'
		SE='┌'
		NE='└'
		SW='┐'
		NW='┘'
		SWE='┬'
		NWE='┴'
		;;
	ascii)
		WE='-'
		NS='|'
		SE='+'
		NE='+'
		SW='+'
		NW='+'
		SWE='+'
		NWE='+'
		;;
	plain)
		WE=' '
		NS=' '
		SE=' '
		NE=' '
		SW=' '
		NW=' '
		SWE=' '
		NWE=' '
		;;
	*) fatal "invalid theme name: $theme" ;;
	esac

	# read the entire input first
	local input
	mapfile -t input
	# declare -p input

	# process input
	local max_cols=()
	local num_cols=1
	local line len cells cell i cell_len

	# calculate length for each line
	for line in "${input[@]}"; do
		len=${line//$separator/}
		len=${#len}

		# calculate length for each cell
		IFS=$separator read -ra cells <<<"$line"
		for i in "${!cells[@]}"; do
			((cell_len = $(printable-len "${cells[i]}") + xpadding * 2))

			# get max for each col
			if ((cell_len > max_cols[i])); then
				max_cols[i]=$cell_len
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
		line+=$(repeat "$WE" "${max_cols[i]}")

		# add vertical separator
		if ((i < num_cols - 1)); then
			line+=$SWE
		fi
	done
	line+=$SW$RST

	# insert title
	if [[ -n $title ]]; then
		# ((len = $(printable-len "$color$SE") + 1))
		((len = ${#color} + ${#SE} + 1))

		title=$title_color$title$RST
		line="${line:0:len}$title${line:$((len + $(printable-len "$title")))}"
	fi
	echo "$line"

	# add vertical padding
	local ypad=()
	for ((i = 0; i < ypadding; i++)); do
		ypad+=("$(repeat "$separator" "$num_cols")")
	done
	input=("${ypad[@]}" "${input[@]}" "${ypad[@]}")

	# add horizontal padding
	local xpad
	xpad=$(repeat ' ' "$xpadding")

	# read each line
	for line in "${input[@]}"; do
		IFS=$separator read -ra cells <<<"$line"

		# read each cell
		line=$color$NS$RST
		for ((i = 0; i < num_cols; i++)); do
			cell=$xpad${cells[i]}$xpad
			line+=$cell

			# left pad
			cell_len=$(printable-len "$cell")
			line+=$(repeat ' ' "$((max_cols[i] - cell_len))")

			line+=$color$NS$RST
		done

		# print line
		echo "$line"
	done

	# bottom line
	line=$color$NE
	for ((i = 0; i < num_cols; i++)); do
		line+=$(repeat "$WE" "${max_cols[i]}")

		# add vertical separator
		if ((i < num_cols - 1)); then
			line+=$NWE
		fi
	done
	line+=$NW$RST
	echo "$line"
}

# https://patorjk.com/software/taag/#p=display&f=Small%20Block&t=Eiguchi%20Pablo&x=none
mapfile -t NAME <<EOF
${COLOR5}▛▀▘▗          ▌  ▗  ▛▀▖   ▌  ▜    
${COLOR5}▙▄ ▄ ▞▀▌▌ ▌▞▀▖▛▀▖▄  ▙▄▘▝▀▖▛▀▖▐ ▞▀▖
${COLOR5}▌  ▐ ▚▄▌▌ ▌▌ ▖▌ ▌▐  ▌  ▞▀▌▌ ▌▐ ▌ ▌
${COLOR5}▀▀▘▀▘▗▄▘▝▀▘▝▀ ▘ ▘▀▘ ▘  ▝▀▘▀▀  ▘▝▀ 
EOF

mapfile -t CONTACT <<EOF
${BOLD}${COLOR5}DEVELOPER

${COLOR5}Yokohama, Japan
${COLOR1}eiguchipablo.dev
EOF

mapfile -t ABOUT <<EOF
${BOLD}HELLO!${RST} I'm a Japanese-Argentinian developer
mainly focused on Next/React and TypeScript.
I like to learn new technologies and keep
improving as developer.
EOF

mapfile -t SKILLS <<EOF
Frontend:|JS/TS, React/Next, Tailwind
Backend:|Node, Express, Golang
Tools:|Bash, SQL
Other:|Three.js, React Native
EOF

mapfile -t QR <<EOF
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
${BOLD}\$${RST} curl ${COLOR3}eiguchipablo.dev${RST}
EOF

# generate output
mapfile -t output < <(
	# add header
	for ((i = 0; i < ${#NAME[@]} || i < ${#CONTACT[@]}; i++)); do
		echo "${NAME[i]}|${CONTACT[i]}"
	done | box -y 1 -x 9 -s "|" -T plain | rtrim

	# generate about
	mapfile -t aboutbox < <(
		printf '%s\n' "${ABOUT[@]}" | box -y 1 -x 1 -t " About " -C "$COLOR4"
	)

	# generate skills
	mapfile -t skillsbox < <(
		printf '%s\n' "${SKILLS[@]}" | box -y 1 -x 1 -t " Skills " -C "$COLOR4" -s "|"
	)

	# add them both
	for ((i = 0; i < ${#aboutbox[@]} || i < ${#skillsbox[@]}; i++)); do
		if ((i >= ${#aboutbox[@]})); then
			aboutbox[i]=$(repeat ' ' "$(printable-len "${aboutbox[0]}")")
		fi
		echo "${aboutbox[i]}  ${skillsbox[i]}"
	done

	# add qr
	printf '%s\n' "${QR[@]}" | box -x 31 -T plain
)

printf '%s\n' "${output[@]}" | rtrim
