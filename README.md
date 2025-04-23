# docker-sandbox




wsl --install<br/>

<br/><br/>


sudo apt-get update<br/>
sudo apt-get install ca-certificates curl gnupg<br/>
sudo install -m 0404 -d /etc/apt/keyrings<br/>
curl https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg<br/>
sudo chmod a+r /etc/apt/keyrings/docker.gpg<br/>
echo \<br/>
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \<br/>
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null<br/>
sudo apt-get update<br/>
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin<br/>


<br/><br/>



sudo dockerd<br/>
(or sudo systemctl start docker)<br/>



