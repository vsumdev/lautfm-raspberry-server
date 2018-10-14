FROM hypriot/rpi-node:latest

# docker run -it -p 3000:3000 -v /dev/snd:/dev/snd -v $(pwd):/home/node -v /opt/vc:/opt/vc --privileged nodeserver

WORKDIR /home/node
ADD . /home/node/
RUN apt-get update && apt-get install -y mplayer alsa-utils
EXPOSE 3000:3000
RUN echo "/opt/vc/lib" > /etc/ld.so.conf.d/00-vmcs.conf
CMD ["sh","-c","ldconfig && node index.js"]
