import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class GerenciadorXML {

    public void salvar(String nome, int numeroCamisa) {
        try (FileWriter writer = new FileWriter("jogadores.xml", true)) {
            String jogadorXML = """
                                <jogador>
                                    <nome>""" + nome + "</nome>\n" +
                                "    <numero_camisa>" + numeroCamisa + "</numero_camisa>\n" +
                                "</jogador>\n";
            writer.write(jogadorXML);
            System.out.println("Jogador salvo com sucesso!");
        } catch (IOException e) {
            System.out.println("Erro ao salvar jogador: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        GerenciadorXML gerenciador = new GerenciadorXML();
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Adicionando jogadores:");
            while (true) {
                System.out.print("Digite o nome do jogador (ou 'sair' para encerrar): ");
                String nome = scanner.nextLine();
                if (nome.equalsIgnoreCase("sair")) {
                    break;
                }
                
                System.out.print("Digite o número da camisa do jogador: ");
                int numeroCamisa = scanner.nextInt();
                scanner.nextLine(); // Limpar o buffer de entrada
                
                gerenciador.salvar(nome, numeroCamisa);
            }
            
            System.out.println("Todos os jogadores foram salvos com sucesso!");
        }
    }
}
