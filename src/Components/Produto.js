import React from 'react';
import { useParams } from 'react-router';
import styles from './Produto.module.css';
import Head from './Head.js';

const Produto = () => {
  const [produto, setProduto] = React.useState(null);
  const [carregando, setCarregando] = React.useState(false);
  const [error, setError] = React.useState(null);
  /// esse useParams me retorna o id de onde estou clicando, no caso aparece notebook, camera e tal;
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchProduto(url) {
      try {
        setCarregando(true);
        const response = await fetch(url);
        const json = await response.json();
        setProduto(json);
        //console.log(produto);
      } catch (erro) {
        setError('Um erro ocorreu');
      } finally {
        setCarregando(false);
      }
    }
    fetchProduto(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
  }, [id]);

  if (carregando) return <div className="carregando"></div>;
  if (error) return <p>{error}</p>;
  if (produto === null) return null;
  return (
    <section className={styles.produto + ' animeLeft'}>
      <Head
        title={`Ranek | ${produto.nome}`}
        description={`Ranek | Esse é um produto: ${produto.nome}`}
      />
      <div>
        {' '}
        {produto.fotos.map((foto) => (
          <img key={foto.src} src={foto.src} alt={foto.titilo} />
        ))}
      </div>
      <div>
        <h1>{produto.nome}</h1>
        <span className={styles.preco}>R$ {produto.preco}</span>
        <p className={styles.descricao}>{produto.descricao}</p>
      </div>
      <h1>Produto</h1>
    </section>
  );
};

export default Produto;
