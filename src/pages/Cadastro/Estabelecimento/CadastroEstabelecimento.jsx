import { useCallback, useState } from 'react';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles } from '../../../config/enums';
import { estabelecimentosOptions } from '../../../mocks/estabelecimentos';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import useValidatePessoal from '../../../components/Step/StepValidation/useValidatePessoal';
import useValidateContato from '../../../components/Step/StepValidation/useValidateContato';
import useValidateDescricao from '../../../components/Step/StepValidation/useValidateDescricao';
import useValidateLogin from '../../../components/Step/StepValidation/useValidateLogin';
import StepPessoal from '../../../components/Step/StepContent/StepPessoal';
import StepContato from '../../../components/Step/StepContent/StepContato';
import StepDescricao from '../../../components/Step/StepContent/StepDescricao';
import StepLogin from '../../../components/Step/StepContent/StepLogin';
import PropTypes from 'prop-types';

CadastroEstabelecimento.propTypes = {
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroEstabelecimento({ setStartCadastro }) {
  const initialData = {
    // StepPessoal
    nome: '',
    cnpj: '',
    tipo: estabelecimentosOptions[0].value,
    // StepContato
    endereco: '',
    telefone: '',
    // StepDescricao
    horarioFuncionamento: '',
    descricao: '',
    // StepFinal
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.ESTABELECIMENTO
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
        return <StepContato data={data} setData={setData} errors={errorsContato} />;
      case 2:
        return <StepDescricao data={data} setData={setData} errors={errorsDescricao} />;
      case 3:
        return <StepLogin data={data} setData={setData} errors={errorsLogin} />;
      case 0:
      default:
        return (
          <StepPessoal
            data={data}
            setData={setData}
            role={UserRoles.ESTABELECIMENTO}
            errors={errorsPessoal}
          />
        );
    }
  }

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
      />
    </VerticalContainer>
  );
}
