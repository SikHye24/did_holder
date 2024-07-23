import { AskarModule } from '@credo-ts/askar';
import {
  Agent,
  WsOutboundTransport,
  HttpOutboundTransport,
  ConnectionsModule,
} from '@credo-ts/core';
import { agentDependencies } from '@credo-ts/react-native';
import { ariesAskar } from '@hyperledger/aries-askar-react-native';

// Bob 에이전트 초기화 함수
export const initializeBobAgent = async () => {
  // ariesAskar 초기화 확인
  if (!ariesAskar) {
    throw new Error('Failed to load ariesAskar. Ensure it is installed correctly.');
  }

  const config = {
    label: 'demo-agent-bob',
    walletConfig: {
      id: 'mainBob',
      key: 'demoagentbob00000000000000000000',
    },
  };

  const agent = new Agent({
    config,
    modules: {
      askar: new AskarModule({ ariesAskar }),
      connections: new ConnectionsModule({ autoAcceptConnections: true }),
    },
    dependencies: agentDependencies,
  });

  agent.registerOutboundTransport(new WsOutboundTransport());
  agent.registerOutboundTransport(new HttpOutboundTransport());

  await agent.initialize();

  return agent;
};

// 초대장 수락 함수
export const receiveInvitation = async (agent, invitationUrl) => {
  const { outOfBandRecord } = await agent.oob.receiveInvitationFromUrl(invitationUrl);
  return outOfBandRecord;
};
