import Head from 'next/head';
import withAuth from 'src/hooks/withAuth';

const home = () => {
  return (
    <>
      <Head>
        <title>Pinkgreen.</title>
      </Head>
      <section>
        <h1>Caros amigos</h1>
        <p>
          a percepção das dificuldades nos obriga à análise das condições financeiras e administrativas exigidas. O incentivo ao avanço tecnológico, assim como o novo modelo estrutural aqui preconizado pode nos levar a considerar a reestruturação do remanejamento dos quadros funcionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a hegemonia do ambiente político desafia a capacidade de equalização do sistema de participação geral. O cuidado em identificar pontos críticos na expansão dos mercados mundiais auxilia a preparação e a composição dos procedimentos normalmente adotados.
        </p>
        <p>
          Do mesmo modo, o fenômeno da Internet possibilita uma melhor visão global das direções preferenciais no sentido do progresso. Todavia, o desenvolvimento contínuo de distintas formas de atuação estimula a padronização dos relacionamentos verticais entre as hierarquias. Acima de tudo, é fundamental ressaltar que a constante divulgação das informações assume importantes posições no estabelecimento do processo de comunicação como um todo.
        </p>
        <p>
          As experiências acumuladas demonstram que o entendimento das metas propostas estende o alcance e a importância das condições inegavelmente apropriadas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que o desafiador cenário globalizado representa uma abertura para a melhoria dos índices pretendidos. Por outro lado, a contínua expansão de nossa atividade faz parte de um processo de gerenciamento das posturas dos órgãos dirigentes com relação às suas atribuições.
        </p>
      </section>
    </>
  );
};

export default withAuth(home)
