import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/privacy.module.css";
import Sidebar from "@/Components/Sidebar";


export default function Privacy() {


  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.background}>
      <h1>Termos de Uso e Política de Privacidade</h1>
        <div className={style.container}>
            
            <h2>Bem-vindo(a) ao nosso site de Locação de Carretas, Carros, Veículos e Equipamentos e Ferramentas! Antes de utilizar nossos serviços, pedimos que leia atentamente os seguintes termos de uso e política de privacidade. Ao se cadastrar e utilizar nossa plataforma, você concorda e aceita todos os termos aqui estabelecidos.</h2>
            <p>1. Cadastro e Informações Pessoais</p>
            <h2>1.1. Ao se cadastrar em nosso site, você concorda em fornecer informações precisas, atualizadas e completas, incluindo seu nome, e-mail, CPF, telefone, CEP e endereço.</h2>
            <h2>1.2. Você é responsável pela veracidade e confiabilidade das informações fornecidas e se compromete a mantê-las atualizadas.</h2>
            <h2>1.3. Ao se cadastrar, você concorda em receber comunicações relacionadas ao serviço, como confirmações de locação, notificações e informações relevantes.</h2>
            <p>2. Privacidade e Proteção de Dados Pessoais</p>
            <h2>2.1. Respeitamos a sua privacidade e protegemos seus dados pessoais de acordo com as leis de proteção de dados aplicáveis.</h2>
            <h2>2.2. Os dados pessoais fornecidos por você serão tratados de forma segura e utilizados exclusivamente para os fins relacionados à prestação dos serviços de locação e administração da plataforma.</h2>
            <h2>2.3. Não compartilharemos, venderemos ou alugaremos seus dados pessoais a terceiros sem o seu consentimento prévio, exceto quando exigido por lei ou autoridade competente.</h2>
            <h2>2.4. Adotamos medidas de segurança adequadas para proteger seus dados pessoais contra acesso não autorizado, divulgação, alteração ou destruição.</h2>
            <p>3. Uso da Plataforma</p>
            <h2>3.1. Ao utilizar nossa plataforma, você concorda em cumprir todas as leis aplicáveis e se compromete a não utilizar o serviço para fins ilegais, fraudulentos ou prejudiciais a terceiros.</h2>
            <h2>3.2. Você é responsável por todas as atividades realizadas em sua conta, incluindo o uso correto das informações fornecidas.</h2>
            <h2>3.3. Não nos responsabilizamos por quaisquer danos ou prejuízos causados pelo uso inadequado da plataforma por parte do usuário.</h2>
            <p>4. Propriedade Intelectual</p>
            <h2>4.1. Todos os direitos de propriedade intelectual relacionados à plataforma, incluindo o conteúdo, design, logotipos e marcas registradas, são de nossa exclusiva propriedade ou licenciados para nós.</h2>
            <h2>4.2. Nenhum conteúdo da plataforma pode ser copiado, reproduzido, modificado, distribuído, republicado, baixado ou transmitido de qualquer forma sem nossa autorização prévia por escrito.</h2>
            <p>5. Alterações nos Termos de Uso e Política de Privacidade</p>
            <h2>5.1. Reservamo-nos o direito de modificar estes termos de uso e política de privacidade a qualquer momento, sem aviso prévio.</h2>
            <h2>5.2. As alterações entrarão em vigor após a publicação na plataforma. Recomendamos que você revise periodicamente os termos atualizados.</h2>
            <h2>5.3. O uso contínuo da plataforma após a modificação dos termos será considerado como aceitação das alterações realizadas.</h2>
            <p>Se você tiver alguma dúvida, entre em contato conosco no botão que está no canto inferior</p>
        </div>
      </div>
      <Footer/>
    </>
  )

}