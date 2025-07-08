import 'dart:convert';

import 'package:app/core/dio.dart';
import 'package:app/core/storage.dart';
import 'package:app/providers/websocket.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Chat extends ConsumerStatefulWidget {
  final int receiverId;
  const Chat({super.key, required this.receiverId});

  @override
  ConsumerState<Chat> createState() => _ChatState();
}

class _ChatState extends ConsumerState<Chat> {
  TextEditingController controller = TextEditingController();
  List chats = [];

  Future<void> getChats() async {
    final dioClient = DioChatClient();
    String? id = await getId();

    final body = {'id': int.parse(id!), 'userId': widget.receiverId};

    final response = await dioClient.dio.get('/message', data: body);
    print(response.data);

    if (response.statusCode == 200) {
      chats = response.data['data'];
      setState(() {});
    }
  }

  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      getChats();
      listenWebsoket();
    });
    super.initState();
  }

  Future<void> listenWebsoket() async {
    final wsClient = ref.read(webSocketProvider);

    final id = await getId();
    wsClient.channel.stream.listen((data) {
      final message = jsonDecode(data);
      print(message);
      setState(() {
        chats.add({
          'receiverId': int.parse(id!),
          'senderId': widget.receiverId,
          'content': message['message'],
        });
      });
    });
  }

  void sendMessage() async {
    final wsClient = ref.read(webSocketProvider);
    wsClient.sendMessage(widget.receiverId, controller.text.trim());
    final id = await getId();
    setState(() {
      chats.add({
        'receiverId': widget.receiverId,
        'senderId': int.parse(id!),
        'content': controller.text.trim(),
      });
    });
    controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          SizedBox(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: ListView.builder(
              itemCount: chats.length,
              itemBuilder: (context, index) {
                final data = chats[index];
                return (data['receiverId'] == widget.receiverId)
                    ? ConstrainedBox(
                      constraints: BoxConstraints(
                        maxWidth: MediaQuery.of(context).size.width * 0.7,
                      ),
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 5,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.green[200],
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [Text(data['content'])],
                          ),
                        ),
                      ),
                    )
                    : ConstrainedBox(
                      constraints: BoxConstraints(
                        maxWidth: MediaQuery.of(context).size.width * 0.7,
                      ),
                      child: Align(
                        alignment: Alignment.centerRight,
                        child: Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 5,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.blue[200],
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [Text(data['content'])],
                          ),
                        ),
                      ),
                    );
              },
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              height: 40,
              decoration: BoxDecoration(
                color: Colors.grey,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(10),
                  topRight: Radius.circular(10),
                ),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: TextField(
                      controller: controller,
                      decoration: InputDecoration(
                        fillColor: Colors.white,
                        focusColor: Colors.white,
                        hintText: 'Send a message',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: Colors.black, width: 1),
                        ),
                      ),
                    ),
                  ),
                  ElevatedButton(onPressed: sendMessage, child: Text('send')),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
