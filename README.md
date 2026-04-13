Instalar .NET SDK e Visual Studio para abrir o backend:

https://dotnet.microsoft.com/pt-br/download/visual-studio-sdks


Instalar SQL Server:

https://download.microsoft.com/download/5/1/4/5145fe04-4d30-4b85-b0d1-39533663a2f1/SQL2022-SSEI-Expr.exe


Instalar SQL Server e criar o banco via SSMS

https://aka.ms/ssms/22/release/vs_SSMS.exe

Abrir o SSMS

Criar o banco manualmente no SSMS

No SSMS: botão direito em Databases → New Database.

Nome: AvanadeTarefasDb


Baixar o projeto do github Avanade-Protagonize-Desafio-main.zip

https://github.com/Flaviobrdf/Avanade-Protagonize-Desafio

Descompactar



Abrir pasta backend\AvanadeTarefasApi no VsCode

Abrir terminal do vscode na pasta AvanadeTarefasApi

Configurar o nome do servidor e nome do banco do SSMS no arquivo appsettings.json ("DefaultConnection"):

Ex (Server: localhost\\SQLEXPRESS e Banco criado: AvanadeTarefasDb):

"DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=AvanadeTarefasDb;Trusted_Connection=True;TrustServerCertificate=True;"


Abrir PowerShell:

Abrir pasta da api do projeto,

ex: 

  CD Avanade_Tarefas-main\backend\AvanadeTarefasApi

Digitar comando para criar a tabela no banco:

  dotnet ef database update

Digitar o comando para rodar o backend: 
  
  dotnet run

Ver a porta que está rodando, exemplo:
  
  Now listening on: http://localhost:5112

Deixar o banco rodando para acessar a aplicação


Abrir pasta backend\AvanadeTarefasApi no VsCode

Abrir terminal do vscode na pasta AvanadeTarefasApi

Verificar a porta localhost (apiUrl) no arquivo src\app\service\tarefas.service.ts

  Verificar se a porta do localhost do dotnet está igual no Apiutl, se necessário cnfigurar
  
  Ex, linha 17:
  
    private apiUrl = 'http://localhost:5112/api/Tarefas';


Abrir pasta Avanade_Tarefas-main\frontend no VsCode

Abrir terminal do vscode

  Digitar: 
  
    npm install -g @angular/cli
  
  Digitar: 
  
    npm update
  
  Digitar:
  
    ng serve

Ver no terminal a porta local que está acessível a página web.

Exemplo:

  Local: http://localhost:4200/

Essa porta Precisa ser a mesma configurada no arquivo Program.cs da pasta da AvanadeTarefasApi

  Ex, linha 16:
  
    policy.WithOrigins("http://localhost:4200")

É possível alterar no vs code a porta no vscode executando:

    ng serve --port 4200

Ou alterar a porta no Program.cs da pasta AvanadeTarefasApi

    Alterando o Program.cs precisa parar o servidor e digitar os comandos:
    
    Digitar comando para atualizar a aplicação:
    
      dotnet build
    
    Digitar o comando para rodar o backend: 
    
      dotnet run


Para executar o front, bastar estar na pasta Avanade_Tarefas-main\frontend no VsCode

    Digitar:
    
        ng serve

        Acessar no navegador o localhost indicado, ex:

        http://localhost:4200/
  




