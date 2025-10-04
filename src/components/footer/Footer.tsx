import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"; // Componente Next.js Image
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Links do rodapé
  // Mantive a estrutura em português, mas melhorei o espaçamento da lista (space-y-2)
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

  // Links sociais
  const linksSociais = [
    { icone: Facebook, href: "#", label: "Facebook" },
    { icone: Twitter, href: "#", label: "Twitter" },
    { icone: Linkedin, href: "#", label: "LinkedIn" },
    { icone: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative border-t border-border bg-background text-center md:text-left">
      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-background/5 to-background/20 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Conteúdo principal: Marca, Newsletter e Links */}
        <div className="pt-5 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-5 lg:grid-cols-12">

            <div className="md:col-span-2 lg:col-span-4">
              
              {/* Logo e Nome da Marca (Melhoria de Semântica e Design) */}
              <Link href="/" className="inline-flex items-center -translate-x-7 gap-2 mb-4 hover:opacity-80 transition-opacity">
                {/* Ajustei o tamanho da imagem para ser mais coeso e utilizei 'object-contain' */}
                <div className="relative h-20 w-20 -mr-6 shrink-0">
                  <Image 
                    src="/assets/logo.png" 
                    alt="Logo Uplys" 
                    layout="fill"
                    objectFit="contain" 
                  />
                </div>
                <span className="text-3xl font-semibold text-foreground/90 tracking-tighter">Uplys</span>
              </Link>

              <p className="text-sm w-full  text-muted-foreground mb-6 md:max-w-sm">
                Transformando dados em insights acionáveis. Eleve sua inteligência de negócios com análises de ponta.
              </p>

              {/* Newsletter */}
              <div className="space-y-2 ">
                <p className="text-sm font-semibold text-foreground">
                  Assine nossa Newsletter
                </p>
                <form className="flex flex-col sm:flex-row gap-2 md:max-w-sm">
                  <Input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="bg-card border-border focus-visible:ring-primary h-10 w-full"
                    aria-label="Digite seu e-mail para a newsletter"
                  />
                  <Button variant="default" className="shrink-0 h-10 px-4">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Inscrever-se</span>
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground pt-1">
                  Sem spam. Apenas o melhor conteúdo sobre análise de dados.
                </p>
              </div>
            </div>

            {/* Seções de Links */}
            <div className="md:col-span-3 lg:col-span-8 md:mt-20">
              {/* Layout de grade 2 colunas no mobile, 4 colunas no small/medium screens para distribuir os 4 grupos de links */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-10 sm:grid-cols-4">
                
                {/* Mapeamento dos links */}
                {Object.entries(linksRodape).map(([key, links]) => (
                  <div key={key}>
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
                      {/* Formata a chave para exibir como título */}
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h3>
                    <ul className="space-y-1"> {/* Aumentado de space-y-1 para space-y-2 para melhor espaçamento */}
                      {links.map((link) => (
                        <li key={link.nome}>
                          <Link 
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
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
        <div className="border-t border-border pt-6 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <p className="text-sm text-muted-foreground order-2 sm:order-1">
              © {currentYear} Uplys. Todos os direitos reservados.
            </p>
            
            {/* Redes sociais */}
            <div className="flex gap-6 order-1 sm:order-2">
              {linksSociais.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
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