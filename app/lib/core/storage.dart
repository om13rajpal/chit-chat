import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

Future<void> saveToken(String token) async {
  await storage.write(key: 'token', value: token);
}

Future<String?> getToken() async {
  return await storage.read(key: 'token');
}

Future<void> deleteToken() async {
  await storage.delete(key: 'token');
}

Future<void> saveId(int id) async {
  await storage.write(key: 'id', value: id.toString());
}

Future<String?> getId() async {
  return await storage.read(key: 'id');
}

Future<void> deleteId() async {
  await storage.delete(key: 'id');
}
