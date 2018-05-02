import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SUN_SOCKET_URL);

const OverviewSocket = cb => {
  return {
    initialize: filters => socket.emit('sunoverviewtableelk', filters),
    listen: () => {
      socket.on('sunoverviewtableelkupdate', function(data) {
        cb(data);
      });
    },
    reload: filters => {
      socket.emit('sunoverviewclose', filters);
      socket.emit('sunoverviewtableelk', filters);
    },
  };
};

const clientDisconnect = () => {
  socket.emit('disconnect');
};

const Sections = cb => {
  return {
    initialize: filters => socket.emit('sunsectionselk', filters),
    listen: () => {
      socket.on('sunosectionsupdate', function(data) {
        cb(data);
      });
    },
    reload: filters => {
      socket.emit('sunsectionsclose', filters);
      socket.emit('sunoverviewtableelk', filters);
    },
  };
};

export { OverviewSocket, Sections, clientDisconnect };
