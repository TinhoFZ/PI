class Tesouro {
  final String nome;
  final String descricao;
  final String raride; // Talvez ENUM?
  final double valor;
  final String imagem; // Caminho para imagem

  const Tesouro({
    required this.nome,
    required this.descricao,
    required this.raride,
    required this.valor,
    required this.imagem,
  });
}