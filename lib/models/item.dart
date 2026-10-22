class Item {
  final String nome;
  final String descricao;
  final String tipo; // Talvez ENUM?
  final String imagem;

  const Item({
    required this.nome, 
    required this.descricao,
    required this.tipo,
    required this.imagem,
  });
}