import 'package:app/core/dio.dart';
import 'package:app/core/storage.dart';
import 'package:app/providers/websocket.dart';
import 'package:app/screens/chat.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Dashboard extends ConsumerStatefulWidget {
  const Dashboard({super.key});

  @override
  ConsumerState<Dashboard> createState() => _DashboardState();
}

List users = [];

class _DashboardState extends ConsumerState<Dashboard> {
  late String? id;

  Future<void> getUsers(BuildContext context) async {
    final dioClient = DioClient();
    id = await getId();
    try {
      final response = await dioClient.dio.get("/user/all/$id");
      if (response.statusCode == 200) {
        users = response.data['data'];
        setState(() {});
      }
    } on DioException catch (e) {
      if (e.response != null) {
        print('Server error: ${e.response?.data}');
      } else {
        print('Connection error: ${e.message}');
      }
    }
  }

  @override
  void initState() {
    initWsAndUsers();
    super.initState();
  }

  Future<void> initWsAndUsers() async {
    await getUsers(context);
    if (id != null) {
      final wsClient = ref.read(webSocketProvider);
      wsClient.connect(int.parse(id!));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: ListView.builder(
          itemCount: users.length,
          itemBuilder: (context, index) {
            print(users[index]);
            return ListTile(
              onTap:
                  () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder:
                          (context) => Chat(receiverId: users[index]['id']),
                    ),
                  ),
              leading: Text('${index + 1}'),
              title: Text(users[index]['username']),
            );
          },
        ),
      ),
    );
  }
}
