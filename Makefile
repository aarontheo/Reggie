compile:
	tsc

ff-tooling:
	npm install --save-dev @types/firefox-webext-browser

TMUX_SESSION_NAME=reggie

dev: clean-tmux
	# tmux kill-session -t $(TMUX_SESSION_NAME)
	tmux new-session -d -s $(TMUX_SESSION_NAME)
	tmux send-keys -t $(TMUX_SESSION_NAME) 'web-ext run --devtools --start-url https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz' C-m
	tmux split-window -h -t $(TMUX_SESSION_NAME)
	tmux send-keys -t $(TMUX_SESSION_NAME):0.1 'tsc --watch' C-m
	# tmux split-window -h -t $(TMUX_SESSION_NAME)
	# tmux send-keys -t $(TMUX_SESSION_NAME):0.2 'git status' C-m
	tmux attach -t $(TMUX_SESSION_NAME)

run: compile
	web-ext run --devtools --start-url https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz

clean-tmux:
	tmux list-sessions | grep -o '^[^:]*' | xargs -I {} tmux kill-session -t {}
