import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles } from '../../../config/enums';
import { estabelecimentosOptions } from '../../../mocks/estabelecimentos';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import useValidatePessoal from '../../../components/Input/Validation/useValidatePessoal';
import useValidateContato from '../../../components/Input/Validation/useValidateContato';
import useValidateDescricao from '../../../components/Input/Validation/useValidateDescricao';
import useValidateLogin from '../../../components/Input/Validation/useValidateLogin';
import InputPessoal from '../../../components/Input/Content/InputPessoal';
import InputContato from '../../../components/Input/Content/InputContato';
import InputDescricao from '../../../components/Input/Content/InputDescricao';
import InputLogin from '../../../components/Input/Content/InputLogin';
import { loginCadastro } from '../../../store/modules/usuarios/reducer';
import { criarEstabelecimento } from '../../../store/modules/estabelecimentos/reducer';
import PropTypes from 'prop-types';

CadastroEstabelecimento.propTypes = {
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroEstabelecimento({ setStartCadastro }) {
  const initialData = {
    // InputPessoal
    nome: '',
    cnpj: '',
    tipo: estabelecimentosOptions[0].value,
    // InputContato
    endereco: '',
    telefone: '',
    imagem: '', // Opcional
    // InputDescricao
    horarioFuncionamento: '',
    descricao: '',
    // StepFinal
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.ESTABELECIMENTO,
    // Definindo como zero as coordenadas já que a localização será obtida quando o usuário acessar o mapa pela primeira vez
    latitude: '0',
    longitude: '0',
    // TODO: Gerenciamento de assinatura (usuários gratuitos X pagos)
    assinante: false
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Empresa', 'Contato', 'Descrição', 'Login'];

  const widthContainer = '20rem';

  // Validando os steps
  // Pessoal
  const { validatePessoal, ...errorsPessoal } = useValidatePessoal({
    nome: data.nome,
    cnpj: data.cnpj
  });

  // Contato
  const { validateContato, ...errorsContato } = useValidateContato({
    endereco: data.endereco,
    telefone: data.telefone
  });

  // Descrição
  const { validateDescricao, ...errorsDescricao } = useValidateDescricao({
    horarioFuncionamento: data.horarioFuncionamento,
    descricao: data.descricao
  });

  // Login
  const { validateLogin, ...errorsLogin } = useValidateLogin({
    email: data.email,
    senha: data.senha,
    repetirSenha: data.repetirSenha
  });

  const handleForm = useCallback(() => {
    if (activeStep === 0) {
      return validatePessoal();
    }
    if (activeStep === 1) {
      return validateContato();
    }
    if (activeStep === 2) {
      return validateDescricao();
    }
    if (activeStep === 3) {
      return validateLogin();
    }
    return () => {};
  }, [activeStep, validatePessoal, validateContato, validateDescricao, validateLogin]);

  function stepRender() {
    switch (activeStep) {
      case 1:
        return <InputContato data={data} setData={setData} errors={errorsContato} />;
      case 2:
        return <InputDescricao data={data} setData={setData} errors={errorsDescricao} />;
      case 3:
        return <InputLogin data={data} setData={setData} errors={errorsLogin} />;
      case 0:
      default:
        return (
          <InputPessoal
            data={data}
            setData={setData}
            role={UserRoles.ESTABELECIMENTO}
            errors={errorsPessoal}
          />
        );
    }
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCriarFuncionario = () => {
    const estabelecimento = {
      usuario: {
        nome: data.nome,
        email: data.email,
        endereco: data.endereco,
        telefone: data.telefone,
        imagem: data.imagem,
        senha: data.senha,
        role: UserRoles.ESTABELECIMENTO
      },
      // Definindo como zero as coordenadas já que a localização será obtida quando o usuário acessar o mapa pela primeira vez
      latitude: data.latitude,
      longitude: data.longitude,
      cnpj: data.cnpj,
      tipo: data.tipo,
      descricao: data.descricao,
      horarioFuncionamento: data.horarioFuncionamento,
      assinante: data.assinante
    };
    dispatch(criarEstabelecimento({ ...estabelecimento }));
    dispatch(loginCadastro({ ...estabelecimento }));
    // Após o cadastro, redireciona para a página principal
    navigate('/');
  };

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}
    >
      <StepCount steps={steps} activeStep={activeStep} />
      {stepRender()}
      <StepButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onReset={() => setStartCadastro(false)}
        stepsNumber={steps.length}
        onValidateForm={handleForm}
        onCallApi={handleCriarFuncionario}
      />
    </VerticalContainer>
  );
}
