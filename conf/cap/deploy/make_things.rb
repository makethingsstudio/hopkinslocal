# ==========================================================================
#   § Setup Server
# ==========================================================================
set :stage, :dev
set :stage_url, "http://p0282.p.mkthn.gs"
server "ftp.make-things.com", user: "makethingsstudio", roles: %w{web app db}
set :tmp_dir, "/home/makethingsstudio/tmp"
set :deploy_to, "hosts/clients.make-things.com/p0282/#{fetch(:stage)}/"
