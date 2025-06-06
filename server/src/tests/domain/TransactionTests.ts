import {Transaction}  from '../../domain/adapter/Transaction';

describe( 'transaction entity', () => {
    it( 'should create a valid transaction', () => {
        const amount = 1000;
        const senderCvu = 1234567890;
        const receiverCvu = 9876543210;
        const description = 'P2P transaction';

        const transaction = new Transaction( amount, senderCvu, receiverCvu, description );

        expect( transaction.amount ).toBe( amount );
        expect( transaction.senderCvu ).toBe( senderCvu );
        expect( transaction.receiverCvu ).toBe( receiverCvu );
        expect( transaction.description ).toBe( description );
    } );

    it( 'should throw an error when CVUs are invalid', () => {
        const amount = 1000;
        const invalidSenderCvu = -1234567890;
        const invalidReceiverCvu = -9876543210;

        expect( () => {
            new Transaction( amount, invalidSenderCvu, invalidReceiverCvu, 'Invalid CVU' );
        } ).toThrow( /CVU must be a positive number/ );
    } );
});