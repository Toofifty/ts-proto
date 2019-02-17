import { messageToTypeName } from '../src/types';
import { TypeNames } from 'ts-poet';

describe('main', () => {
  describe('messageToTypeName', () => {
    it('handles top-level messages', () => {
      // these are not very useful tests now that this is just a map lookup
      const typeMap = new Map<string, [string, string]>();
      typeMap.set('namespace.Message', ['namespace', 'Message']);
      expect(messageToTypeName(typeMap, '.namespace.Message')).toEqual(TypeNames.anyType('Message@./namespace'));
    });

    it('handles nested messages', () => {
      const typeMap = new Map<string, [string, string]>();
      typeMap.set('namespace.Message.Inner', ['namespace', 'Message_Inner']);
      expect(messageToTypeName(typeMap, '.namespace.Message.Inner')).toEqual(
        TypeNames.anyType('Message_Inner@./namespace')
      );
    });

    it('handles value types', () => {
      const typeMap = new Map<string, [string, string]>();
      expect(messageToTypeName(typeMap, '.google.protobuf.StringValue')).toEqual(
        TypeNames.unionType(TypeNames.STRING, TypeNames.UNDEFINED)
      );
    });
  });
});
