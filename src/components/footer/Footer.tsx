import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linksRodape = {
    produto: [
      { nome: "Serviços", href: "#services" },
      { nome: "Preços", href: "#pricing" },
      { nome: "Segurança", href: "#" },
      { nome: "Roteiro", href: "#" },
    ],
    empresa: [
      { nome: "Sobre", href: "#" },
      { nome: "Blog", href: "#" },
      { nome: "Contato", href: "#" },
    ],
    recursos: [
      { nome: "Central de Ajuda", href: "#" },
      { nome: "Documentação", href: "#" },
      { nome: "Comunidade", href: "#" },
    ],
    legal: [
      { nome: "Privacidade", href: "#" },
      { nome: "Termos", href: "#" },
      { nome: "Política de Cookies", href: "#" },
      { nome: "Licenças", href: "#" },
    ],
  };

  const linksSociais = [
    { icone: Facebook, href: "#", label: "Facebook" },
    { icone: Twitter, href: "#", label: "Twitter" },
    { icone: Linkedin, href: "#", label: "LinkedIn" },
    { icone: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-center md:text-left">
      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-gray-50/50 dark:via-gray-900/50 to-gray-100/20 dark:to-gray-800/20 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Conteúdo principal: Marca, Newsletter e Links */}
        <div className="pt-5 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-5 lg:grid-cols-12">

            <div className="md:col-span-2 lg:col-span-4">
              
              {/* Logo e Nome da Marca */}
              <Link href="/" className="inline-flex items-center -translate-x-7 gap-2 mb-4 hover:opacity-80 transition-opacity">
                <div className="relative h-20 w-20 -mr-6 shrink-0">
                  <Image 
                    src="/assets/logo2.png" 
                    alt="Logo Uplys" 
                    layout="fill"
                    objectFit="contain" 
                  />
                </div>
                <span className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tighter">Uplys</span>
              </Link>

              <p className="text-sm w-full text-gray-600 dark:text-gray-400 mb-6 md:max-w-sm">
                Transformando dados em insights acionáveis. Eleve sua inteligência de negócios com análises de ponta.
              </p>

              {/* Newsletter */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Assine nossa Newsletter
                </p>
                <form className="flex flex-col sm:flex-row gap-2 md:max-w-sm">
                  <Input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus-visible:ring-primary text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500 h-10 w-full"
                    aria-label="Digite seu e-mail para a newsletter"
                  />
                  <Button variant="default" className="shrink-0 h-10 px-4 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Inscrever-se</span>
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-500 pt-1">
                  Sem spam. Apenas o melhor conteúdo sobre análise de dados.
                </p>
              </div>
            </div>

            {/* Seções de Links */}
            <div className="md:col-span-3 lg:col-span-8 md:mt-20">
              <div className="grid grid-cols-3 gap-x-8 gap-y-10 sm:grid-cols-4">
                
                {Object.entries(linksRodape).map(([key, links]) => (
                  <div key={key}>
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900 dark:text-white">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h3>
                    <ul className="space-y-1">
                      {links.map((link) => (
                        <li key={link.nome}>
                          <Link 
                            href={link.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
                          >
                            {link.nome}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
              </div>
            </div>

          </div>
        </div>

        {/* Rodapé inferior: Copyright e Redes Sociais */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <p className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
              © {currentYear} Uplys. Todos os direitos reservados.
            </p>
            
            {/* Redes sociais */}
            <div className="flex gap-6 order-1 sm:order-2">
              {linksSociais.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
                >
                  <social.icone className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;