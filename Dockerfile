FROM node

ADD . /opt/
WORKDIR /opt
ENV NEXT_PUBLIC_API=https://pepiti.com/stats/api/v1
RUN npm install -g pnpm
RUN pnpm install

CMD ["pnpm", "dev"]
