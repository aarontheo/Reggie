compile: ff-tooling
	tsc

ff-tooling:
	npm install --save-dev @types/firefox-webext-browser

TMUX_SESSION_NAME=reggie

clean:
	rm -rf dest
	tmux kill-session -t $(TMUX_SESSION_NAME)

run:
	# Kill the existing tmux session if it exists
	tmux kill-session -t $(TMUX_SESSION_NAME)
	tmux new-session -d -s $(TMUX_SESSION_NAME)
	tmux send-keys -t $(TMUX_SESSION_NAME) 'web-ext run --devtools --start-url https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz' C-m
	tmux split-window -h -t $(TMUX_SESSION_NAME)
	tmux send-keys -t $(TMUX_SESSION_NAME):0.1 'tsc --watch' C-m
	tmux attach -t $(TMUX_SESSION_NAME)
