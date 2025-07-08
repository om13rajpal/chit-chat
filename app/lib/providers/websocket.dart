import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class WebsocketClient {
  late WebSocketChannel channel;

  void connect(int id) {
    channel = WebSocketChannel.connect(Uri.parse('ws://localhost:3001'));
    channel.sink.add(jsonEncode({"type": "register", "id": id}));
  }

  void sendMessage(int to, String message) {
    final payload = jsonEncode({
      "type": "message",
      "to": to,
      "message": message,
    });

    channel.sink.add(payload);
  }

  void close() {
    channel.sink.close();
  }
}

final webSocketProvider = Provider<WebsocketClient>((ref) {
  final wsClient = WebsocketClient();

  ref.onDispose(() => wsClient.close());

  return wsClient;
});
