# config valid only for current version of Capistrano
lock '3.4.0'





# ==========================================================================
#   § Project Setup
# ==========================================================================
set :application, 'cied.georgetown.edu'
set :repo_url, 'git@bitbucket.org:benkutil/cied-website-dev.git'
set :scm, :git
set :branch, "dist/dev"
#set :git_strategy, SubmoduleStrategy





# ==========================================================================
#   § Capistrano Setup
# ==========================================================================
set :log_level, :info
set :use_sudo, false
set :ssh_options, {
    forward_agent: true
}

set :keep_releases, 5





# ==========================================================================
#   § Linked Files
# ==========================================================================
set :linked_files, %w{wp-config.php}
set :linked_dirs, %w{content/uploads}
